const express = require('express');
const userRoutes = require('./Routes/UserRoutes');

const app = express();

app.use(express.json());
app.use(userRoutes)

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;