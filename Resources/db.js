(function(){
	webshop.db = {};
	
	//webshop.db.file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'shopData.json');
	
	var db = Ti.Database.open('WebShop');
	db.execute('CREATE TABLE IF NOT EXISTS mainCategories(id TEXT PRIMARY KEY, name TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS subCategories(id TEXT PRIMARY KEY, main_id TEXT, name TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS products(id TEXT PRIMARY KEY, sub_id TEXT, name TEXT, text TEXT, price TEXT, image TEXT)');
	db.execute('CREATE TABLE IF NOT EXISTS images(id TEXT PRIMARY KEY, prod_id TEXT, url TEXT)');
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
		var nbrRows = result.rowCount;
		var count = 1;
		while (result.isValidRow()) {
				var row = Ti.UI.createTableViewRow({
					height:70,
					filter: result.fieldByName('name'),
					name: result.fieldByName('name'),
					id: result.fieldByName('id'),
					hasChild: true});
	
				var label = Ti.UI.createLabel({
					text: result.fieldByName('name'),
					color: '#420404',
					shadowColor:'#900',
					shadowOffset:{x:0,y:1},
					textAlign:'left',
					left:10,
					font:{fontWeight:'bold',fontSize:18},
					width:'auto',
					height:'auto'
				});
				row.add(label);
				if(count === 1) {
					row.backgroundImage = 'images/tableView/topRow.png';	
					row.selectedBackgroundImage = 'images/tableView/topRowSelected.png';
					count++;
				} else if(count < nbrRows) {
					row.backgroundImage = 'images/tableView/middleRow.png';
					row.selectedBackgroundImage = 'images/tableView/middleRowSelected.png';
					count++;
				} else if(count === nbrRows) {
					row.backgroundImage = 'images/tableView/bottomRow.png';
					row.selectedBackgroundImage = 'images/tableView/bottomRowSelected.png';
					count++;
				}

			list.push(row);

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
		var nbrRows = result.rowCount;
		var count = 1;
		while (result.isValidRow()) {
				var row = Ti.UI.createTableViewRow({
					height:60,
					filter: result.fieldByName('name'),
					name: result.fieldByName('name'),
					id: result.fieldByName('id'),
					selectedBackgroundColor: '#670000',
					hasChild: true});
	
				var label = Ti.UI.createLabel({
					text: result.fieldByName('name'),
					color: '#420404',
					shadowColor:'#900',
					shadowOffset:{x:0,y:1},
					textAlign:'left',
					left:20,
					font:{fontWeight:'bold',fontSize:18},
					width:'auto',
					height:'auto'
				});
				row.add(label);
					if(count === 1) {
					row.backgroundImage = 'images/tableView/topRow.png';	
					row.selectedBackgroundImage = 'images/tableView/topRowSelected.png';
					count++;
				} else if(count < nbrRows) {
					row.backgroundImage = 'images/tableView/middleRow.png';
					row.selectedBackgroundImage = 'images/tableView/middleRowSelected.png';
					count++;
				} else if(count === nbrRows) {
					row.backgroundImage = 'images/tableView/bottomRow.png';
					row.selectedBackgroundImage = 'images/tableView/bottomRowSelected.png';
					count++;
				}
				//row.leftImage = result.fieldByName('image');
				//row.rightImage = 'indicator.png';

			list.push(row);
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
		var nbrRows = result.rowCount;
		var count = 1;
		while (result.isValidRow()) {
				var row = Ti.UI.createTableViewRow({
					height:100,
					filter: result.fieldByName('name'),
					name: result.fieldByName('name'),
					id: result.fieldByName('id'),
					//backgroundColor: '#670000',
					selectedBackgroundColor: '#670000'
				});
	
				var label = Ti.UI.createLabel({
					text: result.fieldByName('name'),
					color: '#E6E6E6',
					shadowColor:'black',
					shadowOffset:{x:0,y:1},
					textAlign:'left',
					top: 25,
					left:100,
					font:{fontWeight:'light',fontSize:17},
					width:'auto',
					height:'auto'
				});
				
				var label2 = Ti.UI.createLabel({
					text: result.fieldByName('price'),
					color: '#E6E6E6',
					shadowColor:'black',
					shadowOffset:{x:0,y:1},
					textAlign: 'left',
					top: 70,
					right: 40,
					font:{fontWeight: 'bold', fontSize: 14},
					width: 'auto',
					height: 'auto'
				})
				row.add(label);
				row.add(label2);
			
				var left = Ti.UI.createImageView({
					top: 5,
					bottom: 5,
					left:5,
					width:'85',
					height:'95',
					borderRadius:10.0,
					borderColor: '#420404',
					borderWidth: 3.0,
					canScale:false,
					backgroundImage: result.fieldByName('image')
				});
				var right = Ti.UI.createImageView({
					top: 5,
					bottom: 5,
					right:5,
					width:'20',
					height:'95',
					canScale:false,
					backgroundImage: 'indicator.png'
				});
				row.add(left);
				row.add(right);
				//row.leftImage = result.fieldByName('image');
				//row.rightImage = 'indicator.png';
				
			list.push(row);
			
			result.next();
		}
		result.close();
		db.close();
		
		return list;
	};
	
	
	webshop.db.productDetails = function(_id){
		var product = {};
			product.images = [];
		var db = Ti.Database.open('WebShop');
		var images = db.execute('SELECT * FROM images WHERE prod_id = ?', [_id]);
		while (images.isValidRow()) {
			var view = Ti.UI.createImageView({
				image: images.fieldByName('url')
			});
			product.images.push(view);
			images.next();
		}
		var details = db.execute('SELECT * FROM products WHERE id = ?', [_id]);
			product.text = details.fieldByName('text');
		return product;
	};
	
	webshop.db.productImages = function(_id){
		var list = [];
		var db = Ti.Database.open('WebShop');
		var result = db.execute('SELECT * FROM images WHERE prod_id = ?', [_id]);
		while (result.isValidRow()) {
			list.push(result.fieldByName('url'));
			result.next();
		}
		return list
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
	webshop.db.addImages = function(_prod_id, _url){
		var db = Ti.Database.open('WebShop');
		db.execute('INSERT INTO images(prod_id, url) VALUES(?,?)', _prod_id, _url);
	};
	
	if (!checkForData(Ti.App.Properties.getString('client'))) {
		webshop.net.getShopData(function(data) {
			for (var main = 0; main < data.items.length; main++) {

					webshop.db.addMainCats(data.items[main]._id, data.items[main].name);
					for(var subs = 0; subs < data.items[main].items.length; subs++) {
							Ti.API.info(data.items[main].items.length);
							
							webshop.db.addSubCats(data.items[main].items[subs]._id, data.items[main]._id, data.items[main].items[subs].name);
							for(var prods = 0; prods < data.items[main].items[subs].items.length; prods++) {
									var image = data.items[main].items[subs].items[prods].images;
									var imgPath = webshop.net.getImage(data.items[main].items[subs].items[prods]._id, image[0], 550);
									for (var img = 0; img < image.length; img++) {
										webshop.db.addImages(data.items[main].items[subs].items[prods]._id, image[img].replace('{relTypeCode}', 563));
										Ti.API.info(img)
									}
									
									webshop.db.addProducts(data.items[main].items[subs].items[prods]._id, data.items[main].items[subs]._id, data.items[main].items[subs].items[prods].name, data.items[main].items[subs].items[prods].text, data.items[main].items[subs].items[prods].price, imgPath);	
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
