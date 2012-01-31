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
	
	webshop.net.getImage = function (_imageId, _url, _size) {
		var imageName = _imageId + _size;
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageName);
		var url = _url.replace('{relTypeCode}', _size);
		
		if(!file.exits()) {
			Ti.API.info(url)
			var xhr = Ti.Network.createHTTPClient();
			xhr.onload = function() {
				if(xhr.status == 200) {
					file.write(xhr.responseData);
				}
			};
			xhr.open("GET", url);
			xhr.send();
		}
		return file.nativePath;	
	};	
})();
