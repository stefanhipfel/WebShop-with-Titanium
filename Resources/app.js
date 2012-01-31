Titanium.UI.setBackgroundColor('#ffffff');

var webshop = {}; //`bh` is our app's namespace
Ti.App.Properties.setString('client', 'elegance');
Ti.include( //we'll be including all the files for our namespace in the root app context
	'ui.js',
	'network.js',
	'db.js'
);

//Use our custom UI constructors to build the app's UI
var tabs = webshop.ui.createApplicationTabGroup();
tabs.open();

//Log our current platform to the console
Ti.API.info('Welcome to the WebShop for '+Ti.Platform.osname);