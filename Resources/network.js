(function(){
	webshop.net = {};
	
	webshop.net.getShopData = function (_data) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			var data = JSON.parse(this.responseText);
			_data(data);
		};
		xhr.open("GET", "http://127.0.0.1:8000/elegance/cache/getCompleteList");
		xhr.send();
	};
	//--> falsche Methodennamen werfen KEINEN FEHLER!!!!!!!!!!!!!!!!!!!!!!!! file.exits!!!
	
	webshop.net.getImage = function (_imageId, _url, _size) {
		var imageName = _imageId + _size + '.jpg';
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageName);
		var url = _url.replace('{relTypeCode}', _size);
		
		if(!file.exists()) {
			Ti.API.info('-------------------image_network')
			var xhr = Ti.Network.createHTTPClient();
			xhr.setTimeout(10000);
			xhr.onload = function() {
				if(xhr.status == 200) {
					file.write(xhr.responseData);
				}
				xhr.onerror = function()
						{
							alert("Your internet connection is slow or unstable. Please try again later.");
						};
			};
			xhr.open("GET", url);
			xhr.send();
		}
		return file.nativePath;	
	};	
})();
