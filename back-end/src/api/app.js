const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');
const productRoutes = require('./Routes/ProductsRoutes');
const salesRoute = require('./Routes/SalesRoutes');
const salesProductsRoute = require('./Routes/SalesProductsRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(express.static('public'));
app.use(productRoutes);
app.use(salesRoute);
app.use(salesProductsRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
