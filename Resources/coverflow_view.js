var win = Titanium.UI.currentWindow;


// create coverflow view with images
var view = Titanium.UI.iOS.createCoverFlowView({
	images:win.images,
	backgroundColor:'#000'
});

// click listener - when image is clicked
view.addEventListener('click',function(e)
{
	Titanium.API.info("image clicked: "+e.index+', selected is '+view.selected);	
});

// change listener when active image changes
view.addEventListener('change',function(e)
{
	Titanium.API.info("image changed: "+e.index+', selected is '+view.selected);	
});
win.add(view);

// change button to dynamically change the image
var change = Titanium.UI.createButton({
	title:'Change Image',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
change.addEventListener('click',function()
{
	Titanium.API.info("selected is = "+view.selected);
	view.setImage(view.selected,'../images/imageview/28.jpg');
});
