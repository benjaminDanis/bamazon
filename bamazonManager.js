var mysql = require('mysql');
var inquirer = require('inquirer');

var idExists = false;


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',
	password: '',
	database: 'bamazon_db'
});

createConnection();

function createConnection(){

	connection.connect(function(err){
		if (err) throw err;
		console.log('connect as id ' + connection.threadId + '\n');
		managerView();
});
}

function managerView(){

	inquirer.prompt([
	{
		type: 'list',
		message: 'Select action',
		name: 'manager',
		choices: ['View Products for Sale', 'View Low Inventory',
		'Add to Inventory', 'Add New Product', 'Exit']
	}
	]).then(function(response){

		switch(response.manager){
			case 'View Products for Sale':
				 viewProducts();
				 break;
			case 'View Low Inventory':
				 viewLowInventory();
				 break;
			case 'Add to Inventory':
				 addToInventory();
				 break;
			case 'Add New Product':
				 addNewProduct();
				 break;
			case 'Exit':
				console.log('Session Ended');
				connection.end();
		}
	})
}

function viewProducts(){
	console.log('Fetching Inventory....');
	connection.query('SELECT* FROM products', function(err, response){
		if(err) throw err;

  	  for (var i = 0; i < response.length; i++) {
  	  	console.log('---------------------');
  	  	console.log('Item ID: ' + response[i].item_id);
  	  	console.log('Product: ' +response[i].product_name);
  	  	console.log('Department: ' +response[i].department_name);
  	  	console.log('Price: $' +response[i].price);
  	  	console.log('Qty: ' +response[i].stock_qty);
  	  	console.log('---------------------\n');

  	  }
  	  continuePrompt();
	})	
}

function viewLowInventory(){
	console.log('Fetching Products with Less than 300 Remaining Inventory....');

	connection.query('SELECT* FROM products WHERE stock_qty < 300'
		, function(err, response){
		if (err) throw err

			if(response.length < 1){
				console.log('---------------------\n\n');
				console.log('FULLY STOCKED\n\n');
				console.log('---------------------');
				continuePrompt();
			}
			else{

			for (var i = response.length - 1; i >= 0; i--) {
				console.log('---------------------');
		  	  	console.log('Item ID: ' + response[i].item_id);
		  	  	console.log('Product: ' +response[i].product_name);
		  	  	console.log('Department: ' +response[i].department_name);
		  	  	console.log('Price: $' +response[i].price);
		  	  	console.log('Qty: ' +response[i].stock_qty);
		  	  	console.log('---------------------\n');
			}
				inventoryPrompt();
			}
	});
}	

function inventoryPrompt(){
	inquirer.prompt([
	{
		type: 'confirm',
		message: 'Restock Inventory?',
		name: 'prompt'
	}]).then(function(response){
		if(response.prompt){
			addToInventory();
		} else{
			continuePrompt();
		}
	})
}

function addToInventory(){

	var idArr = [];

	connection.query('SELECT item_id FROM products', function(err, res){
		for (var i = res.length - 1; i >= 0; i--) {
			idArr.push(parseInt(res[i].item_id));
		}
	});
	
		inquirer.prompt([
	{
		type: 'input',
		message: 'Please enter the ID of the inventory you would like to increase',
		name: 'idSelect',
		validate: function(input){
			if(idArr.indexOf(parseInt(input)) > -1){
				return true;
			} else{
				
				console.log('\nenter valid ID\n');
				return false;

			}
		}
	},
	{
		type: 'input',
		message: 'Next, enter the amount you would like to add',
		name: 'qtySelect'
	}
	]).then(function(response){

		var inventoryId = response.idSelect;
		var inventoryQty = response.qtySelect;

		connection.query('SELECT* FROM products WHERE ?',
			[
			{
				item_id: inventoryId
			}
			], function(err, res){
				if (err) throw err

			var currentQTY = res[0].stock_qty;
			console.log('Restocking...\n')
			console.log('---------------------');
			console.log('Product Name: ' + res[0].product_name);
			console.log('Previous QTY: ' + currentQTY);
			updateQTY(currentQTY, inventoryQty, 0, inventoryId);
			
		})
	})
}



function addNewProduct(){
	console.log('Adding New Product....');

	inquirer.prompt([
	{
		type: 'input',
		message: 'Please Enter PRODUCT NAME',
		name: 'productName'
	},
	{	
		type: 'input',
		message: 'Please Enter DEPARTMENT NAME',
		name: 'departmentName'
	},
	{
		type: 'input',
		message: 'Please Enter PRICE',
		name: 'price'
	},
	{
		type: 'input',
		message: 'Please Enter STOCK QTY',
		name: 'stockQty'
	}]).then(function(response){
		var productName = response.productName;
		var departmentName = response.departmentName;
		var price = response.price;
		var stockQty = response.stockQty;

		createProduct(productName, departmentName, price, stockQty);
	})
}

function updateQTY(current, order, index, id){

	var newQTY = parseInt(current) + parseInt(order);
	console.log('Updated QTY: ' + newQTY);
	console.log('---------------------');
	console.log('\n\n');

	connection.query('UPDATE products SET ? WHERE ?',
		[
			{
				stock_qty: newQTY
			},
			{
				item_id: id
			}
		],
		function(err, res){
		if(err) throw err;
		
			viewLowInventory();
			
	});
}

function continuePrompt(){
	inquirer.prompt([
	{
		type: 'list',
		message: '----',
		name: 'continue',
		choices: ['Return to Menu', 'Exit']
	}]).then(function(response){
		if(response.continue == 'Return to Menu'){
			managerView();
		} else {
			connection.end();
		}
	})
}

function createProduct(name, dpt, price, stock){
	connection.query('INSERT INTO products SET ?',
	{
		product_name: name,
		department_name: dpt,
		price: price,
		stock_qty: stock
	}, function(err, response){
		if (err) throw err

		console.log('NEW ITEM GENERATED. ID: ' + response.insertId);
        console.log('Name: ' + name.toUpperCase());
        console.log('Department: ' + dpt.toUpperCase());
        console.log('Price: ' + price);
        console.log('Stock Qty: ' + stock);

		continuePrompt();
	})
};






















