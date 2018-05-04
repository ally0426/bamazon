DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45),
  department_name VARCHAR(45),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wii", "entertainment", 199.99, 100),("xbox", "entertainment", 399.99, 100), ("playstation", "entertainment", 299.99, 100), 
       ("tshirt", "fasion", 9.99, 100), ("jeans", "fashion", 49.99, 100), ("shoes", "fashion", 99.99, 100), 
       ("laptop", "IT", 799.99, 100), ("Galaxyphone", "IT", 899.99, 100), ("iPhone", "IT", 799.99, 100), 
       ("router", "IT", 199.99, 100);

