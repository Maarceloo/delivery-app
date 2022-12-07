const { Router } = require('express');
const {
  postSalesProducts,
  getAllSalesProducts,
} = require('../Controllers/SalesProductsController');

const SalesProductsRoute = Router();

SalesProductsRoute.post('/salesProducts', postSalesProducts);
SalesProductsRoute.get('/salesProducts', getAllSalesProducts);

module.exports = SalesProductsRoute;
