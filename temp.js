(function(){
	shopapp.ui = {};
	
	// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var display_width = Titanium.Platform.displayCaps.platformWidth;
	
	shopapp.ui.createApplicationUI = function(){
		var tabGroup = Titanium.UI.createTabGroup();
		
		//
		// create base UI tab and root window
		//
		var win1 = Titanium.UI.createWindow({  
		    title:'Welcome',
		    backgroundColor:'#fff'
		});
		var tab1 = Titanium.UI.createTab({  
		    icon:'icons/home@2x.png',
		    title:'Home',
		    window:win1
		});
		
		
		var label1 = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 1',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		var productList = Titanium.UI.createScrollView({
		    contentWidth:'auto',
		    contentHeight:'auto',
		    top:0,
		    showVerticalScrollIndicator:true,
		    showHorizontalScrollIndicator:true
		});
		
		var view = Ti.UI.createView({
		    backgroundColor:'#336699',
		    borderRadius:10,
		    width:display_width,
		    height:200,
		    top:10
		});
		
		productList.add(view);
		win1.add(productList);
		
		//
		// create controls tab and root window
		//
		var win2 = Titanium.UI.createWindow({  
		    title:'Store',
		    backgroundColor:'#fff'
		});
		var tab2 = Titanium.UI.createTab({  
		    icon:'icons/store@2x.png',
		    title:'Store-Finder',
		    window:win2
		});
		
		var label2 = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 2',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		var data = [
			{title:'Bücher', hasChild:true, test:'productView.js'},
			{title:'Computer', hasChild:true, test:'../products/itemCat.js'},
			{title:'Musik', hasChild:true, test:'../products/itemCat.js'},
			{title:'etc', hasChild:true, test:'../products/itemCat.js'},
		
		];
		
		var data1 = [
			{title:'1', hasChild:true, test:'productView.js'},
			{title:'2', hasChild:true, test:'../products/itemCat.js'},
			{title:'3', hasChild:true, test:'../products/itemCat.js'},
			{title:'4', hasChild:true, test:'../products/itemCat.js'},
		
		];
		
		
		var table = Titanium.UI.createTableView({data:data});
		
		// create table view event listener
		table.addEventListener('click', function(e)
		{
			if (e.rowData.test)
			{
				var win = null;
				if (Ti.Platform.name === "android") {
					win = Titanium.UI.createWindow({
						url:e.rowData.test,
						title:e.rowData.title
					});
				} else {
					win = Titanium.UI.createWindow({
						url:e.rowData.test,
						title:e.rowData.title,

					});
					table = Titanium.UI.createTableView({data:data1});
				}
		
		
				if (e.index === 3)
				{
					win.hideTabBar();
				}
				if (Ti.Platform.name==='android' && e.rowData.test.indexOf('window_properties.js') >= 0) {
					// As explained in apidoc for Window, if opacity is ever to be changed for an Android
					// activity during its lifetime, it needs to use a translucent background.  We trigger
					// using a translucent theme by the presence of the opacity property, so we need to
					// set it here.  Setting it to 1 means it's totally opaque, but gives us the property to
					// make it more transparent later with the "toggle opacity" test.
					win3.backgroundColor = "#191919"
					win3.opacity = 1;
				}
				//sTitanium.UI.currentWindow.open(win,{animated:true});
				win.open();
			}
			
		});
		
		//
		// create controls tab and root window
		//
		var win3 = Titanium.UI.createWindow({  
		    title:'Produkte',
		    backgroundColor:'#fff'
		});
		var tab3 = Titanium.UI.createTab({  
		    icon:'icons/produkte@2x.png',
		    title:'Produkte',
		    window:win3
		});
		
		var label2 = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 2',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		win3.add(table);
		//
		// create controls tab and root window
		//
		var win4 = Titanium.UI.createWindow({  
		    title:'Tab 2',
		    backgroundColor:'#fff'
		});
		var tab4 = Titanium.UI.createTab({  
		    icon:'icons/meinBereich.png',
		    title:'Konto',
		    window:win2
		});
		
		var label2 = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 2',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		win4.add(label2);
		
		//
		// create controls tab and root window
		//
		var win4 = Titanium.UI.createWindow({  
		    title:'Tab 2',
		    backgroundColor:'#fff'
		});
		var tab4 = Titanium.UI.createTab({  
		    icon:'icons/warenkorb@2x.png',
		    title:'Warenkorb',
		    window:win2
		});
		
		var label2 = Titanium.UI.createLabel({
			color:'#999',
			text:'I am Window 2',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto'
		});
		
		win4.add(label2);
		
		//
		//  add tabs
		//
		tabGroup.addTab(tab1);  
		tabGroup.addTab(tab2);  
		tabGroup.addTab(tab3);  
		tabGroup.addTab(tab4);
		
		return tabGroup;
		};
	
})();
