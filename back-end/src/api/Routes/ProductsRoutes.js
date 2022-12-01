const { Router } = require('express');
const {
  getAllProducts,
  getIdProduct,
} = require('../Controllers/ProductsController');

const productsRoute = Router();

productsRoute.get('/customer/products', getAllProducts);
productsRoute.get('/customer/products/:id', getIdProduct);

module.exports = productsRoute;
