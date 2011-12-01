(function(){
	webshop.net = {};
	
	webshop.net.getProductCat = function (_cat) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			_cat(JSON.parse(this.responseText));
		};
		xhr.open("GET", "http://10.37.129.3:5984/webshop/_design/productCat/_view/CategorieList");
		xhr.send();
	};
	
	webshop.net.getProducts = function (_items) {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			_items(JSON.parse(this.responseText));
		};
		xhr.open("GET", "http://10.37.129.3:5984/webshop/_design/productCat/_view/productList");
		xhr.send();
	};
	
	
})();
