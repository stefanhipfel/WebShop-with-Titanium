(function(){
	webshop.net = {};
	
	webshop.net.getShopData = function (_data) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			var data = JSON.parse(this.responseText);
			_data(data);
		};
		xhr.open("GET", "http://10.0.2.2:8000/elegance/cache/getCompleteList");
		xhr.send();
	};
	//--> falsche Methodennamen werfen KEINEN FEHLER!!!!!!!!!!!!!!!!!!!!!!!! file.exits!!!
	
	webshop.net.getImage = function (_imageId, _url, _size) {
		var imageName = _imageId + _size + '.jpg';
		var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageName);
		var url = _url.replace('{relTypeCode}', _size);
		
		if(!file.exists()) {
			
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
