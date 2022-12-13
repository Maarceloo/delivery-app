const { Router } = require('express');
const {
  postSalesProducts,
  getAllSalesProducts,
  getSalesProductsById,
} = require('../Controllers/SalesProductsController');
const { jwtValidate } = require('../Utils/Jwt');

const SalesProductsRoute = Router();

SalesProductsRoute.post('/sales/products', jwtValidate, postSalesProducts);

SalesProductsRoute.get('/sales/products', getAllSalesProducts);

SalesProductsRoute.get('/sales/products/:id', getSalesProductsById);

module.exports = SalesProductsRoute;
