DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(2,2) NOT NULL,
  stock_qty INTEGER(30) NOT NULL,
  PRIMARY KEY(item_id)
);

CREATE TABLE departments(
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30),
  overhead_costs INTEGER(11) NOT NULL,
)

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Speakers", "Electronics", 275.00, 7500);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Laptop", "Electronics", 1345.00, 9340);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("TV", "Electronics", 2800.00, 3000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Fishing Rod", "Outdoors", 30.00, 10000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Tent", "Outdoors", 65.00, 12000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Tennis Racket", "Sports", 80.00, 10000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Golf Clubs", "Sports", 420.00, 10000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Acoustic Guitar", "Musical Instrument", 230.00, 4000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Keyboard", "Musical Instrument", 220.00, 2000);

INSERT INTO products(product_name, department_name, price, stock_qty);
VALUES("Shotgun", "Outdoors", 120.00, 10000);