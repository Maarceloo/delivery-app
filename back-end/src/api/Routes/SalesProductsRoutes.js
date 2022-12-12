const { Router } = require('express');
const {
  postSalesProducts,
  getAllSalesProducts,
} = require('../Controllers/SalesProductsController');
const { jwtValidate } = require('../Utils/Jwt');

const SalesProductsRoute = Router();

SalesProductsRoute.post('/sales/products', jwtValidate, postSalesProducts);
SalesProductsRoute.get('/sales/products', getAllSalesProducts);

module.exports = SalesProductsRoute;
