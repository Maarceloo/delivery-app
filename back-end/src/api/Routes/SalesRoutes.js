const { Router } = require('express');
const { postSales } = require('../Controllers/SalesController');
const { getAllSales } = require('../Controllers/SalesController');
const { jwtValidate } = require('../Utils/Jwt');

const SalesRoute = Router();

SalesRoute.post('/seller/orders', jwtValidate, postSales);
SalesRoute.get('/seller/orders', getAllSales);

module.exports = SalesRoute;
