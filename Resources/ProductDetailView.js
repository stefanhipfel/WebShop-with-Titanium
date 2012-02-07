var win = Ti.UI.currentWindow
	,tab = Ti.UI.currentTab
 	,coverWinOpen = false;
win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
			
var scrollView = Titanium.UI.createScrollableView({
	views: win.data.images,
	showPagingControl:true,
	cacheSize:3,
	pagingControlHeight:10,
	pagingControlColor:'#420404',
	maxZoomScale:2.0,
	currentPage:1,
	top: 0,
	height: 200,
	backgroundImage: 'chip.jpg'
});

win.add(scrollView);

		// BODY
var body = Ti.UI.createScrollView({	
	contentWidth:'auto',
	contentHeight:'auto',
	top:200,
	backgroundcolor: 'grey',
	showVerticalScrollIndicator:true
});
var bodyText = Ti.UI.createLabel({
	text: win.data.text,
	height: 'auto',
	width: '95%',
	left:5,
	right:5,
	color: '#900',
	fond: {fonSize: 12},
	textAlign: 'left'
})
body.add(bodyText);
win.add(body);
		
if(!win.isAndroid) {
	var tabBar = Titanium.UI.iOS.createTabbedBar({
		labels:['Info', 'Passend', 'Bewertungen', 'Covers'],
		backgroundColor:'#420404',
		index:0
	});
		
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	win.setToolbar([flexSpace,tabBar,flexSpace]);
		
	var coverWin = Titanium.UI.createWindow({
			url:'coverflow_view.js',
			title: win.title,
			images: win.images,
			height: '50%',
			width: '50%',
			id: win.id
	});
	coverWin.addEventListener('open', function(e) {
				coverWinOpen = true;
	});
	coverWin.addEventListener('close', function(e) {
				coverWinOpen = false;
				tabBar.index = 0;
	});
		
	tabBar.addEventListener('click', function(e)
		{	if(e.index === 3) {
				tab.open(coverWin,{animated:true});
			}
	});
		//if(win.title === Ti.UI.currentWindow.title) {
	Ti.Gesture.addEventListener('orientationchange',function(e) {
		if(e.orientation === Ti.UI.LANDSCAPE_RIGHT || e.orientation === Ti.UI.LANDSCAPE_LEFT) {
			if(!coverWinOpen) {
				Ti.API.info('orientationCHANGED');
				tab.open(coverWin,{animated:true});
			} 				
		}
		if(e.orientation === Ti.UI.PORTRAIT) {
			tab.close(coverWin,{animated:true});
		}
	});
		//}
/*
 *	ANDROID TABBED BAR 
 */		
} else {
	var bBar = Titanium.UI.createView({
    	height:50,
    	left:10,
        layout:'horizontal'
	});
 
	var showSwitch = Titanium.UI.createSwitch({
    	style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
        titleOff:"Shows",
        titleOn:"Shows",
        width:80,
        value:true
	});
 
	var trySwitch = Titanium.UI.createSwitch({
    	style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
        titleOff:"Try List",
        titleOn:"Try List",
        width:80,
        value:false
	}); 
 
	var beenSwitch = Titanium.UI.createSwitch({
    	style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
        titleOff:"Been List",
        titleOn:"Been List",
        width:80,
        value:false
	});

	bBar.add(showSwitch);
	bBar.add(trySwitch);
	bBar.add(beenSwitch);
	 
	showSwitch.addEventListener('click',function(e){
		if (showSwitch.value==true) {
	    	trySwitch.value = false;
	        beenSwitch.value = false;
		} else {
	   		showSwitch.value=true;
	    }
	});
 
    trySwitch.addEventListener('click',function(e){
    	if (trySwitch.value==true) {
            showSwitch.value = false;
			beenSwitch.value = false;
        } else {
          	trySwitch.value=true;
        }
	});
 
   	beenSwitch.addEventListener('click',function(e){
    	if (beenSwitch.value==true) {
                showSwitch.value = false;
                trySwitch.value = false;
        } else {
        	beenSwitch.value=true;
        }
	});
}