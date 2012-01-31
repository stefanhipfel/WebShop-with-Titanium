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
	webshop.ui.createSubCatWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title:_product.title,
			
		});
		win.add(webshop.ui.createSubCatTable(_product.id));
			
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
	webshop.ui.createProductDetailWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title: _product.title
		});
		var view1 = Ti.UI.createView({
			backgroundColor:'red'
		});
		var l1 = Ti.UI.createLabel({
			text:'View 1',
			color:'#fff',
			width:'auto',
			height:'auto'
		});
		view1.add(l1);
		
		var view2 = Ti.UI.createView({
			backgroundColor:'blue'
		});
		var l2 = Ti.UI.createLabel({
			text:'Click Me (View 2 - see log)',
			color:'#fff',
			width:'auto',
			height:'auto'
		});
		view2.add(l2);
		
		var view3 = Ti.UI.createView({
			backgroundColor:'green'
		});
		var l3 = Ti.UI.createLabel({
			text:'View 3',
			color:'#fff',
			width:'auto',
			height:'auto'
		});
		view3.add(l3);
		
		var view4 = Ti.UI.createView({
			backgroundImage:'http://127.0.0.1/webshop/webshop/images/default.jpg'
		});

		var scrollView = Titanium.UI.createScrollableView({
			views:[view1,view2,view3,view4],
			showPagingControl:true,
			pagingControlHeight:10,
			pagingControlColor:'black',
			maxZoomScale:2.0,
			currentPage:1,
			top: 0,
			height: 200
		});

		win.add(scrollView);

		// BODY
		var body = Ti.UI.createScrollView({	
				   	contentWidth:'auto',
					contentHeight:'auto',
					top:200,
					showVerticalScrollIndicator:true,
					showHorizontalScrollIndicator:true
		});
		var bodyText = Ti.UI.createLabel({
			text: 'blalldkflskflskdfldkflsdkfldksf,',
			height: 300,
			width: 'auto',
			shadowColor: '#aaa',
			shadowOffset: {x:1, y:1},
			color: '#900',
			fond: {fonSize: 48},
			textAlign: 'left'
		})
		body.add(bodyText);
		win.add(body);
		
		var tb2 = Titanium.UI.iOS.createTabbedBar({
			labels:['Info', 'Passend', 'Bewertungen', 'Covers'],
			backgroundColor:'blue',
			index:2
		});
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		win.setToolbar([flexSpace,tb2,flexSpace]);
		
		tb2.addEventListener('click', function(e)
		{
			l.text = 'You clicked index = ' + e.index;
		});
			
		return win;
	};
	
	//Table Views
	webshop.ui.createMainCatTable = function(/*Boolean*/ _webApp) {
		var tv = Ti.UI.createTableView();
		
		tv.addEventListener('click', function(_e) {
			var tab = webshop.productsTab;
			tab.open(webshop.ui.createSubCatWindow(_e.rowData));
		});
		
		function populateData() {
			var results = webshop.db.mainCatList();
			Ti.API.info('catlist');
			
			tv.setData(results);
		}
		
		Ti.App.addEventListener('databaseUpdated', populateData);
		
		populateData();
		
		return tv;
	};
	
		//Table Views
	webshop.ui.createSubCatTable = function(_cat) {
		var search = Titanium.UI.createSearchBar({
			showCancel:false
		});
		var tv = Ti.UI.createTableView({
			search: search
		});
		
		tv.addEventListener('click', function(_e) {
			var tab = webshop.productsTab;
			tab.open(webshop.ui.createProductWindow(_e.rowData));
		});
		
		
		function populateData() {
			var results = webshop.db.subCatList(_cat);
			
			tv.setData(results);
		}
		Ti.App.addEventListener('databaseUpdated', populateData);
		
		populateData();
		
		return tv;
	};
	
		//Table Views
	
	webshop.ui.createProductTable = function(_cat) {
		var search = Titanium.UI.createSearchBar({
			showCancel:false
		});
		Ti.API.info(search)
		var tv = Ti.UI.createTableView({
			search: search
		});
		
		tv.addEventListener('click', function(_e) {
			var tab = webshop.productsTab;
			tab.open(webshop.ui.createProductDetailWindow(_e.rowData));
		});
		
		
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
		win.add(webshop.ui.createMainCatTable(_tabName));
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
