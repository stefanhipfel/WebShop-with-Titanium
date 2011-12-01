(function(){
	webshop.db = {};
	
	var db = Ti.Database.open('WebShop');
	db.execute('CREATE TABLE IF NOT EXISTS productCat(id TEXT PRIMARY KEY, cat TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, cat TEXT, inf_1 TEXT, inf_2 TEXT, inf_3 TEXT)');
	db.close();
	
	webshop.db.catList = function(){
		var catList = [];
		var db = Ti.Database.open('WebShop');
		var result = db.execute('SELECT * FROM productCat');
		while (result.isValidRow()) {
			catList.push({
				title: result.fieldByName('cat'),
				id: result.fieldByName('id'),
				hashChild: true
			});
			result.next();
		}
		result.close();
		db.close();
		
		return catList;
	};
	
	webshop.db.productList = function(_id){
		var catList = [];
		var db = Ti.Database.open('WebShop');
		var result = db.execute('SELECT * FROM products WHERE cat = ?', [_id]);
		while (result.isValidRow()) {
			catList.push({
				title: result.fieldByName('inf_1'),
				name: result.fieldByName('inf_2'),
				id: result.fieldByName('cat'),
				hashChild: true
			});
			result.next();
		}
		result.close();
		db.close();
		
		return catList;
	};
	
	webshop.db.addCat = function(_id, _cat){
		var db = Ti.Database.open('WebShop');
		db.execute('INSERT INTO productCat(id, cat) VALUES(?,?)', _id, _cat);
		Ti.App.fireEvent('databaseUpdated');
	};
	
	webshop.db.addProd = function(_cat, _inf1, _inf2, _inf3){
		var db = Ti.Database.open('WebShop');
		db.execute('INSERT INTO products(cat, inf_1, inf_2, inf_3) VALUES(?,?,?,?)', _cat, _inf1, _inf2, _inf3);
		Ti.App.fireEvent('databaseUpdated');
	};
	
	if (!Ti.App.Properties.hasProperty('seeded')) {
		webshop.net.getProductCat(function(data) {
			for (var i in data.rows) {
				Ti.API.info('database', data.rows[i]);
				if(data.rows.hasOwnProperty(i)){
					webshop.db.addCat(data.rows[i].value.id, data.rows[i].value.name);
				}
			}
		});
		
		webshop.net.getProducts(function(data) {
			for (var i in data.rows) {
				if(data.rows.hasOwnProperty(i)){
					webshop.db.addProd(data.rows[i].value.cat, data.rows[i].value.inf_1, data.rows[i].value.inf_2, data.rows[i].value.inf_3);
				}
			}
		});
		Ti.App.Properties.setString('seeded', 'version');
	};	
	
})();
