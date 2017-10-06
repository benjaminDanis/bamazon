var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',
	password: '',
	database: 'bamazon_db'
});

browse();

function browse(){

	inquirer.prompt([
	{
		type: 'confirm',
		message: 'Welcome! Browse inventory?',
		name: 'browse'
	}
	]).then(function(response){
		if (response.browse) {
			console.log()
			makeConnection();			
		}		
	})
}

function makeConnection(){
	connection.connect(function(err){
		if(err) throw err;
		console.log('connect as id ' + connection.threadId + '\n');		
		readProducts();
	});
}

function readProducts(){
  console.log('Fetching inventory...\n');

  connection.query(
  	'SELECT* FROM products', function(err, response){
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
  		purchaseOrder();
  	})
}

function purchaseOrder(){

	inquirer.prompt([
	{
		type: 'input',
		message: 'Please enter the ID of the item you would like to purchase',
		name: 'idSelect'
	},
	{
		type: 'input',
		message: 'Next, enter the amount you would like to purchase',
		name: 'qtySelect'
	}
	]).then(function(response){
		
		var orderId = parseInt(response.idSelect);
		var orderIndex = orderId - 1;
		var orderQty = parseInt(response.qtySelect);

		connection.query('SELECT* FROM products', function(err, res){
			if(err) throw err;
			
			var currentQty = res[orderIndex].stock_qty;

			if(currentQty > orderQty){

			updateQTY(currentQty, orderQty, orderIndex, orderId);

		} else {
			console.log('Insufficient Quantity!');
			purchaseOrder();
		}
		})	
	})
}

function updateQTY(current, order, index, id){

	var newQTY = parseInt(current) - order;
	console.log('Updated QTY: ' + newQTY);

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
		showCost(id, order)
	});
}

function showCost(id, qty){

	connection.query('SELECT* FROM products WHERE ?',
		[
			{
				item_id: id	
			}
		], function(err, res){

			console.log('Price of Product: ' + res[0].price);
			console.log('Qty Ordered: ' + qty);
			var orderCost = parseInt(res[0].price) * qty;
			console.log('Your total cost: $' + orderCost
				+ '\n Thanks for shopping!!');
			connection.end();

	})

}


























