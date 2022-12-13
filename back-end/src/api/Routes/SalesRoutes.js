const { Router } = require('express');
const { postSales } = require('../Controllers/SalesController');
const { getAllSales } = require('../Controllers/SalesController');
const { salesUpdate } = require('../Controllers/SalesController');
const { jwtValidate } = require('../Utils/Jwt');

const SalesRoute = Router();

SalesRoute.post('/customer/orders', postSales);
SalesRoute.get('/customer/orders', getAllSales);
SalesRoute.get('/seller/orders', getAllSales);
SalesRoute.patch('/seller/orders', salesUpdate)

module.exports = SalesRoute;
