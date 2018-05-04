var mysql = require("mysql");
var inquirer = require("inquirer");


// var newQuantity;
// var requestedProduct;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "",
    // insecureAuth : true,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // const productNumbers = res.length;
        // const { stock_quantity } = res  
        // console.log("after const------------->", res[0].stock_quantity);     
        buyProduct();
    });
}

function buyProduct() {
    console.log("Buying a product...\n");

    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the item id you would like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "units",
            type: "input",
            message: "How many units would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        console.log("Answer: ", answer);

        var userId = answer.id;
        console.log("Chosen item id: ", userId);

        var userUnits = answer.units;
        console.log("Chosen quantity from stock: ", userUnits, "\n");

        connection.query("SELECT * FROM products WHERE ?", [{ item_id: answer.id }], function (err, res) {
            if (err) throw err;
            //grab the item_id from the table that matches
            //return the item_id
            console.log("Res: ", res);
            var current_quantity = res[0].stock_quantity;
            console.log("Current quantity in stock: ", current_quantity);
            var price = res[0].price;
            var remaining_quantity = current_quantity - answer.units;
            console.log("Remaining quantity in stock: ", remaining_quantity);

            if (current_quantity > answer.units) {

                console.log("Amount Remaining: " + remaining_quantity);
                console.log("Total Cost: " + (answer.units * price) + "\n");

                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                    [
                        remaining_quantity, answer.id
                    ],

                    // connection.query("UPDATE products SET stock_quantity=? WHERE item_id?",
                    // 	[remaining_quantity, answer.id],

                    function (err, res) {
                        console.table(res);
                    });

                connection.query("SELECT * FROM products", function (err, res) {

                    console.log("Here is an updated inventory: ");
                    console.log("------------------------------- \n");
                    console.table(res);
                });

            } else {
                console.log("Insufficient amounts, please try again!");
            }

            connection.end();

        });
    })

}
















// // console.log("Updating products...\n");
// // console.log("Product Name/Stock quantity: ", answer.item, " ", answer.units);
// // console.log("stock_quantity", typeof(stock_quantity));
// console.log("item_id======================", response.id);



// // console.log("stock_quantity", typeof(stock_quantity));

// // newQuantity = parseInt(stock_quantity) - parseInt(response.units);
// // console.log("newQuantity", newQuantity);
// choiceId = parseInt(response.id);
// requestedQuantity = parseInt(response.items);
// inventory = parseInt(response.stock_quantity);
// console.log("choiceId", typeof (choiceId));
// checkStocks();
// debugger;
//     });
// }


// function checkStocks(choiceId, requestedQuantity, inventory) {

//     for (var i = 0; i < inventory.length; i++) {
//         if (inventory[i].item_id === choiceId) {
//             console.log("ID*********************", inventory[i].item_id);
//             return inventory[i]
//         }
//     }

// }



// //             if (newQuantity <= 0) {
// //                 console.log("Insufficient quantity!");
// //                 buyProduct();
// //             } else {
// //                 var query = connection.query(
// //                     "UPDATE products SET ? WHERE ?",
// //                     [
// //                         {
// //                             quantity: parseInt(newQuantity)
// //                         },
// //                         {
// //                             name: requestedProduct
// //                         }
// //                     ],
// //                     function (err, res) {
// //                         console.log("products updated!\n");

// //                     }
// //                 );

// //                 // logs the actual query being run
// //                 console.log(query.sql);
// //             }
// //             // showPrice();
// //         }

// // function showPrice() {
// //             let productPrice = answer.units * answer.price;
// //             console.log(productPrice);
// //             connection.end();
// //         }