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
			url:'http://localhost/Titanium/about.html',
			height:'auto',
			width:'auto'
		})
		win.add(webview);
		
		return win; 
	};
	
	//Sub window
	webshop.ui.createSubCatWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title:_product.name,
			backgroundImage: 'chip.jpg'
		});
		win.add(webshop.ui.createSubCatTable(_product.id));
			
		return win;
	};
	
	//Sub window
	webshop.ui.createProductWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title:_product.name,
			backgroundImage: 'chip.jpg'
		});
		win.add(webshop.ui.createProductTable(_product.id));
			
		return win;
	};
	//Sub window
	webshop.ui.createProductDetailWindow = function(/*Object*/ _product) {
		var win = Ti.UI.createWindow({
			title: _product.name
		});
		var coverWinOpen = false;
		win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
		var tab = webshop.productsTab;
		var scrollView = Titanium.UI.createScrollableView({
			views: webshop.db.productDetails(_product.id),
			showPagingControl:true,
			cacheSize:3,
			pagingControlHeight:10,
			pagingControlColor:'#420404',
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
					backgroundcolor: 'grey',
					showVerticalScrollIndicator:true,
					showHorizontalScrollIndicator:true
		});
		var bodyText = Ti.UI.createLabel({
			text: 'blalldkflskflskdfldkflsdkfldksf,',
			height: 'auto',
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
			backgroundColor:'#420404',
			index:2
		});
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		win.setToolbar([flexSpace,tb2,flexSpace]);
		
		var coverWin = Titanium.UI.createWindow({
			url:'coverflow_view.js',
			title:_product.name,
			images: webshop.db.productImages(_product.id),
			id: _product.id
		});
		coverWin.addEventListener('open', function(e) {
				coverWinOpen = true;
				Ti.API.info(coverWinOpen)
		});
		coverWin.addEventListener('close', function(e) {
				coverWinOpen = false;
				Ti.API.info(coverWinOpen)
		});
		
		tb2.addEventListener('click', function(e)
		{	if(e.index === 3) {
				tab.open(coverWin,{animated:true});
			}
		});
		
		Ti.Gesture.addEventListener('orientationchange',function(e) {
			if(e.orientation === Ti.UI.LANDSCAPE_RIGHT || e.orientation === Ti.UI.LANDSCAPE_LEFT) {
				if(!coverWinOpen) {
					tab.open(coverWin,{animated:true});
				} 				
			}
			if(e.orientation === Ti.UI.PORTRAIT) {
				tab.close(coverWin,{animated:true});
			}
		});
			
		return win;
	};
	
	//Table Views
	webshop.ui.createMainCatTable = function(/*Boolean*/ _webApp) {
		var tv = Ti.UI.createTableView({
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			backgroundColor:'transparent',
			separatorColor:'#390A0E',
			top: 30
		});
		
		tv.addEventListener('click', function(_e) {
			var tab = webshop.productsTab;
			tab.open(webshop.ui.createSubCatWindow(_e.rowData));
		});
		
		function populateData() {
			var results = webshop.db.mainCatList();

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
			search: search,
			style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
			backgroundColor:'transparent',
			separatorColor:'#390A0E'
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
		var tv = Ti.UI.createTableView({
			search: search,
			filterAttribute: 'filter',
			style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
			backgroundColor:'transparent',
			separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
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
			backgroundImage: 'chip.jpg',
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
		  icon:'icons/store@2x.png',
		  window: store
		});
		
		webshop.productsTab = Titanium.UI.createTab({
		  title: Ti.Locale.getString('tab_products'),
		  icon:'icons/produkte@2x.png',
		  window: products
		});
		
		webshop.cartTab = Titanium.UI.createTab({
		  title: Ti.Locale.getString('tab_cart'),
		  icon:'icons/warenkorb@2x.png',
		  window: cart
		});
		
		tabGroup.addTab(webshop.homeTab);
		tabGroup.addTab(webshop.storeTab);
		tabGroup.addTab(webshop.productsTab);
		tabGroup.addTab(webshop.cartTab);
		
		return tabGroup;
	};
	
})();
