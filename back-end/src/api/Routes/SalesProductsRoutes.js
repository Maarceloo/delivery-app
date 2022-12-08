const { Router } = require('express');
const {
  postSalesProducts,
  getAllSalesProducts,
} = require('../Controllers/SalesProductsController');

const SalesProductsRoute = Router();

SalesProductsRoute.post('/sales/products', postSalesProducts);
SalesProductsRoute.get('/sales/products', getAllSalesProducts);

module.exports = SalesProductsRoute;
