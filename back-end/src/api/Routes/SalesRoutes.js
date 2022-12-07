const { Router } = require('express');
const { postSales } = require('../Controllers/SalesController');
const { getAllSales } = require('../Controllers/SalesController');

const SalesRoute = Router();

SalesRoute.post('/seller/orders', postSales);
SalesRoute.get('/seller/orders', getAllSales);

module.exports = SalesRoute;
