(function() {
	webshop.ui = {};
	webshop.ui.L = Titanium.Locale.getString;
	
	//Main window
	webshop.ui.createAboutWindow = function() {
		var win = Ti.UI.createWindow({
			title:L('win_about'),
			layout:'vertical',
			backgroundColor:'#fff'
		});
		
		if (Ti.Platform.osname === 'iphone') {
			var b = Titanium.UI.createButton({
				title:'Close',
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			b.addEventListener('click',function() {
				win.close();
			});
			win.setRightNavButton(b);
		}
		
		var webview = Ti.UI.createWebView({
			url:'about.html',
			height:'auto',
			width:'auto'
		})
		win.add(webview);
		
		return win;
	};
	
	//Sub window
	webshop.ui.createProductWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title:_product.title,
			
		});
		win.add(webshop.ui.createProductTable(_product.id));
			
		return win;
	};
	
		//Sub window
	webshop.ui.createProductCatWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title:_product.title,
			
		});
		
		win.add(webshop.ui.createProductCatTable(_product.id));
			
		return win;
	};
	
	//Table Views
	webshop.ui.createProductCatTable = function(/*Boolean*/ _webApp) {
		var tv = Ti.UI.createTableView();
		
		tv.addEventListener('click', function(_e) {
			var tab = webshop.productsTab;
			tab.open(webshop.ui.createProductWindow(_e.rowData));
		});
		
		function populateData() {
			var results = webshop.db.catList();
			Ti.API.info('catlist');
			
			tv.setData(results);
		}
		
		Ti.App.addEventListener('databaseUpdated', populateData);
		
		populateData();
		
		return tv;
	};
	
		//Table Views
	webshop.ui.createProductTable = function(_cat) {
		var tv = Ti.UI.createTableView();
		
		/*tv.addEventListener('click', function(_e) {
			var tab = webshop.productsTab;
			tab.open(webshop.ui.createProductWindow(_e.rowData));
		});
		*/
		
		function populateData() {
			var results = webshop.db.productList(_cat);
			
			tv.setData(results);
		}
		Ti.App.addEventListener('databaseUpdated', populateData);
		
		populateData();
		
		return tv;
	};
	
	webshop.ui.createShopWindow = function(/*Boolean*/ _tabName) {
		var win = Titanium.UI.createWindow({
		  title: (_tabName),
			activity : {
				onCreateOptionsMenu : function(e) {
					var menu = e.menu;
					var m1 = menu.add({ title : 'about' });
					m1.addEventListener('click', function(e) {
						//open in tab group to get free title bar (android)
						var tab = webshop.homeTab;
						tab.open(webshop.ui.createAboutWindow());
					});
				}
			}
		});
		if(_tabName === L('tab_products')){
		win.add(webshop.ui.createProductCatTable(_tabName));
		};
		
		if (Ti.Platform.osname === 'iphone') {
			var b = Titanium.UI.createButton({
				title:L('about'),
				style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
			});
			b.addEventListener('click',function() {
				//open modal on iOS - looks more appropriate
				webshop.ui.createAboutWindow().open({modal:true});
			});
			win.setRightNavButton(b);
		}
		return win;
	};
	
	
	webshop.ui.createApplicationTabGroup = function() {
		var tabGroup = Titanium.UI.createTabGroup();
		
		var home = webshop.ui.createShopWindow(Ti.Locale.getString('tab_home'));
		var store = webshop.ui.createShopWindow(Ti.Locale.getString('tab_store'));
		var products = webshop.ui.createShopWindow(Ti.Locale.getString('tab_products'));
		var cart = webshop.ui.createShopWindow(Ti.Locale.getString('tab_cart'));
		
		webshop.homeTab = Titanium.UI.createTab({
		  title: Ti.Locale.getString('tab_home'),
		  icon: 'icons/home@2x.png',
		  window: home
		});
		
		webshop.storeTab = Titanium.UI.createTab({
		  title: Ti.Locale.getString('tab_store'),
		  window: store
		});
		
		webshop.productsTab = Titanium.UI.createTab({
		  title: Ti.Locale.getString('tab_products'),
		  window: products
		});
		
		webshop.cartTab = Titanium.UI.createTab({
		  title: Ti.Locale.getString('tab_cart'),
		  window: cart
		});
		
		tabGroup.addTab(webshop.homeTab);
		tabGroup.addTab(webshop.storeTab);
		tabGroup.addTab(webshop.productsTab);
		tabGroup.addTab(webshop.cartTab);
		
		return tabGroup;
	};
	
})();
