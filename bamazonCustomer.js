var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "",
    insecureAuth : true
    database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
        // buyProduct();
  });
}

// function buyProduct() {
//     console.log("Buying a product...\n");

//     inquirer.prompt([
//         {
//             name: "item",
//             type: "input",
//             message: "What is the item you would like to buy?"
//         },
//         {
//             name: "units",
//             type: "input",
//             message: "How many units would you like to buy?",
//             validate: function (value) {
//                 if (isNaN(value) === false) {
//                     return true;
//                 }
//                 return false;
//             }
//         }
//     ]).then(function (answer) {
//         console.log("Updating products...\n");
//         console.log("Product Name/Stock quantity: ", answer.item, " ", answer.units);

//         let newQuantity = stock_quantity - answer.units;
//         let requestedProduct = answer.item;

//         checkStocks();
//     }

// function checkStocks() {
//             if (newQuantity <= 0) {
//                 console.log("Insufficient quantity!");
//                 buyProduct();
//             } else {
//                 var query = connection.query(
//                     "UPDATE products SET ? WHERE ?",
//                     [
//                         {
//                             quantity: newQuantity
//                         },
//                         {
//                             name: requestedProduct
//                         }
//                     ],
//                     function (err, res) {
//                         console.log(res.affectedRows + " products updated!\n");

//                     }
//                 );

//                 // logs the actual query being run
//                 console.log(query.sql);
//             }
//             showPrice();
//         }

// function showPrice() {
//             let productPrice = answer.units * answer.price;
//             console.log(productPrice);
//             connection.end();
//         }


