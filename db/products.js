const { db } = require("./index");

function addProduct(product) {
  return new Promise((resolve, reject) => {
    var params = {
      Item: {
        Name: product.name,
        Price: product.price
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "Products"
    };
    db.put(params, done(resolve, reject));
  });
}

function getAllProducts() {

  return new Promise((resolve, reject) => {
    var params = {
      TableName: "Products"
    };

    db.scan(params, done(resolve, reject));
  });
}

function getProductByName(name) {
  return new Promise((resolve, reject) => {
    var params = {
      Key: {
        Name: name
      },
      TableName: "Products"
    };
    db.get(params, done(resolve, reject));
  });
}

function seedProductsTable() {
  // seed the products table
  [
    { name: 'cucumbers', price: 1.98 },
    { name: 'cilantros', price: 1.29 },
    { name: 'milk', price: 2.45 },
    { name: 'carrots', price: 2.29 },
    { name: 'lettuce', price: 1.09 },
    { name: 'tomatoes', price: 3.45 },
    { name: 'onions', price: 2.89 },
    { name: 'apples', price: 6.49 },
    { name: 'oranges', price: 4.35 },
  ].forEach(addProduct);
}

function done(resolve, reject) {
  return (err, data) => {
    if (err) {
      console.log(err, err.stack);
      reject && reject(err);
    } else {
      console.log(data);
      resolve && resolve(data);
    }
  }
}

module.exports = {
  getAllProducts,
  getProductByName,
  addProduct,
  seedProductsTable
}
