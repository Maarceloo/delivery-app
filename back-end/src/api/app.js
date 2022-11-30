const express = require('express');
const userControllers = require('./Controllers/UserControllers')

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/login', userControllers.login)

module.exports = app;