# Bamazon Node App

## Customer View

### First Screen:
![screen shot 2017-10-10 at 7 56 50 pm](https://user-images.githubusercontent.com/28717260/31416316-3ffd44e6-adf6-11e7-85d6-92d6bbadbbf9.png)

##### The user is asked if they would like to browse the existing inventory. Yes will display the inventory, and no will exit the app.

### View Inventory:
![screen shot 2017-10-10 at 7 56 58 pm](https://user-images.githubusercontent.com/28717260/31416319-40bd13b6-adf6-11e7-8989-4cde2075d1a7.png)
##### If selected, the inventory will display all existing items and prompt the user to enter the ID of the item they would like to purchase.

### Complete Purchase:
![screen shot 2017-10-10 at 8 03 46 pm](https://user-images.githubusercontent.com/28717260/31416320-41c2231e-adf6-11e7-93dd-837b70981ea2.png)
##### The user will be required to enter an ID and quantity. Both prompts have data validation and will prompt the user to re-enter valid data if they enter an ID that is invalid, or try to purchase too much of a certain product. Once the proper information is entered, the inventory will update, display the order and the total price of the customer's order, and exit the app.


## Manager View


### First Screen:
![screen shot 2017-10-08 at 2 33 47 pm](https://user-images.githubusercontent.com/28717260/31320209-3d33a28a-ac36-11e7-9d25-8fe3927ba19b.png)
##### Here, management is prompted with 5 options. View products for sale, view low inventory, add to inventory, create a new product and add it to the inventory, and exit the application.

### Selecting View Products:
![screen shot 2017-10-08 at 2 34 09 pm](https://user-images.githubusercontent.com/28717260/31320211-3d34e834-ac36-11e7-9da4-9bac76caed34.png)
##### After selecting the first option, the user is given access to the database and two options: exit the application or return to the main menu.

### Selecting Low Inventory:
![screen shot 2017-10-08 at 2 34 32 pm](https://user-images.githubusercontent.com/28717260/31320213-3d36fa98-ac36-11e7-9984-0e8458b5ef2a.png)
##### Selecting the low inventory option previews which items have less than 300 in the remaining inventory. The screen will display all the information about the item and prompts the user if they would like to restock. Declining the confirm will ask the user if they would like to go back to the main menu, or exit the program.

### Choosing 'Restock' after Low Inventory
![screen shot 2017-10-08 at 2 35 11 pm](https://user-images.githubusercontent.com/28717260/31320210-3d33dfb6-ac36-11e7-9d56-c3be87095b34.png)
##### Choosing to restock will then show the user the product name, the previous quantity, and the update quantity. It will then automatically display the remaining low inventory. If there is none, it will show that the inventory is fully stocked, and prompt main menu or exit. When restocking, there is also id validation, where an incorrect id will alert the user that the product does not exist, and ask them to re-enter a vlid id.

### Selecting Add to Inventory
![screen shot 2017-10-08 at 2 35 48 pm](https://user-images.githubusercontent.com/28717260/31320212-3d35eef0-ac36-11e7-821e-0dad6acaea84.png)
##### Adding to inventory outright will also provide the same id verification, and display low inventory automatically after the selected product has been restocked. The user will also receive the same prompt to either exit or return to the main menu.

### Selecting Add New Product
![screen shot 2017-10-08 at 2 36 48 pm](https://user-images.githubusercontent.com/28717260/31320214-3d3a2eb6-ac36-11e7-9179-5e1312111494.png)
##### Adding a new product to the inventory allows the user to create the item, department name, set the price, and stock the item. Once the information is entered, it will be displayed as appears in the database, along with the auto generated id. The user can now exit, or return to the main menu.


## Using Inquirer to Validate

### Storing Item ID's


```
    var idArr = [];

    connection.query(
        'SELECT item_id FROM products', function(err, response){
            for (var i = response.length - 1; i >= 0; i--) {
                idArr.push(parseInt(response[i].item_id));
            }); 
```

##### Querying the item_id column of the database and pushing them into an array.

### Validate Function as a Property of Question Object

```
    inquirer.prompt([
    {
        type: 'input',
        message: 'Please enter the ID of the item you would like to purchase',
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
```

##### The validate function will check the value of the input simultaneously with the user answering the prompt. If it fails to meet the requirements it will ask the question again.

