# bamazon

The app will take in orders from customers and deplete stock from the store's inventory. 
Once you run bamazonCustomer.js file on the terminal, it shows 10 products with item_id, product_name, price and stock_quantity info.


![image](https://user-images.githubusercontent.com/20063017/39675574-a305313c-5122-11e8-9368-0fec73852c27.png)


Then, it asks two questions using inquirer npm package. 

- What is the item id you would like to buy?
- How many units would you like to buy?

Then, it shows the Answer object with an id of the chosed prodcut and units to be asked. 
Using the id, it collects the product info from the sql file such as item_id, product_name, department_name, price and stock_quantity.
Based on the current quantity from the sql file, it determines whether it can be purchased or not. 
If so, it calculates the remaining quanity after the purchase and price to pay to buy the units of the product.

Here is an example of it.

Answer:  { id: '4', units: '10' }
Chosen item id:  4
Chosen quantity from stock:  10

Res:  [ RowDataPacket {
    item_id: 4,
    product_name: 't-shirt',
    department_name: 'fasion',
    price: 9.99,
    stock_quantity: 100 } ]
Current quantity in stock:  100
Remaining quantity in stock:  90
Amount Remaining: 90
Total Cost: 99.9



![image](https://user-images.githubusercontent.com/20063017/39675441-c3ef24e0-5120-11e8-9ba9-36ed3c1be8da.png)
