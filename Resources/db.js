(function(){
	webshop.db = {};
	
	//webshop.db.file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'shopData.json');
	
	var db = Ti.Database.open('WebShop');
	db.execute('CREATE TABLE IF NOT EXISTS mainCategories(id TEXT PRIMARY KEY, name TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS subCategories(id TEXT PRIMARY KEY, main_id TEXT, name TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS products(id TEXT PRIMARY KEY, sub_id TEXT, name TEXT, text TEXT, price TEXT, image TEXT)');
	
	db.close();
	
	var checkForData = function(_client) {
		if(Ti.App.Properties.hasProperty('shopData')) {
			var clients = Ti.App.Properties.getList('shopData');
			if(clients.indexOf(_client) == 1) {
				return true;
			} else {
				return false;
			}
		} 
		
	};
	
	webshop.db.mainCatList = function(){
		var list = [];
		var db = Ti.Database.open('WebShop');
		var result = db.execute('SELECT * FROM mainCategories');
		while (result.isValidRow()) {
			Ti.API.info(result.fieldByName('name'));
			list.push({
				title: result.fieldByName('name'),
				id: result.fieldByName('id'),
				hashChild: true
			});
			result.next();
		}
		result.close();
		db.close();
		Ti.API.info(list);
		return list;
	};
	
	webshop.db.subCatList = function(_id){
		var list = [];
		var db = Ti.Database.open('WebShop');
		var result = db.execute('SELECT * FROM subCategories WHERE main_id = ?', [_id]);
		while (result.isValidRow()) {
			list.push({
				title: result.fieldByName('name'),
				name: result.fieldByName('name'),
				id: result.fieldByName('id'),
				hashChild: true
			});
			result.next();
		}
		result.close();
		db.close();
		
		return list;
	};
	
	webshop.db.productList = function(_id){
		var list = [];
		var db = Ti.Database.open('WebShop');
		var result = db.execute('SELECT * FROM products WHERE sub_id = ?', [_id]);
		while (result.isValidRow()) {
				var row = Ti.UI.createTableViewRow({
					height:100,
					filter: result.fieldByName('name'),
					id: result.fieldByName('sub_id'),
					backgroundColor: 'blue',
					selectedBackgroundColor: '#670000',
					hasChild: true});
	
				var label = Ti.UI.createLabel({
					text: result.fieldByName('name'),
					color: '#111',
					shadowColor:'#900',
					shadowOffset:{x:0,y:1},
					textAlign:'left',
					left:130,
					font:{fontWeight:'bold',fontSize:18},
					width:'auto',
					height:'auto'
				});
				row.add(label);
				
			
				var i = Ti.UI.createImageView({
					image: "icons/default.jpg",
					top: 10,
					left: 0,
					width:125,
					height:89
				});
			
				row.add(i);
				
				//data[c] = row;

			list.push(row);
			
			result.next();
		}
		result.close();
		db.close();
		
		return list;
	};
	
	webshop.db.addMainCats = function(_id, _name){
		var db = Ti.Database.open('WebShop');
		db.execute('INSERT INTO mainCategories(id, name) VALUES(?,?)', _id, _name);
	};
	
	webshop.db.addSubCats = function(_id, _main_id, _name){
		var db = Ti.Database.open('WebShop');
		db.execute('INSERT INTO subCategories(id,main_id, name) VALUES(?,?,?)', _id, _main_id, _name);
	};
	
	webshop.db.addProducts = function(_id, _sub_id, _name, _text, _price, _image){
		var db = Ti.Database.open('WebShop');
		db.execute('INSERT INTO products(id, sub_id, name, text, price, image) VALUES(?,?,?,?,?,?)', _id, _sub_id, _name, _text, _price, _image);
		
	};
	if (!checkForData(Ti.App.Properties.getString('client'))) {
		webshop.net.getShopData(function(data) {
			for (var main = 0; main < data.items.length; main++) {

					webshop.db.addMainCats(data.items[main]._id, data.items[main].name);
					for(var subs = 0; subs < data.items[main].items.length; subs++) {
							Ti.API.info(data.items[main].items.length);
							
							webshop.db.addSubCats(data.items[main].items[subs]._id, data.items[main]._id, data.items[main].items[subs].name);
							for(var prods = 0; prods < data.items[main].items[subs].items.length; prods++) {

									webshop.db.addProducts(data.items[main].items[subs].items[prods]._id, data.items[main].items[subs]._id, data.items[main].items[subs].items[prods].name, data.items[main].items[subs].items[prods].text, data.items[main].items[subs].items[prods].price, data.items[main].items[subs].items[prods].images[0].replace('{relTypeCode}', 550));	
							}	
					}
			}
			Ti.App.fireEvent('databaseUpdated');
			
			if(Ti.App.Properties.hasProperty('shopData')) {
				var shopData = Ti.App.Properties.getList('shopData');
				shopData.push(data.name);
				Ti.App.Properties.setList('shopData', shopData);
			}else {
				Ti.App.Properties.setList('shopData', [data.name]);
			}
			
		});		
	};	
	
})();
