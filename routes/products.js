var express = require('express');
var router = express.Router();
const products = require("../db/products");

/* GET products list. */
router.get('/', function(req, res, next) {

  products.getAllProducts().then((products) =>{
    res.send(products).status(200);

  })
});


module.exports = router;
