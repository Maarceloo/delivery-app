const express = require('express');
const userControllers = require('./Controllers/UserControllers')
const userMiddlewares = require('./Middlewares/LoginValidate')

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.get('/login', userMiddlewares.emailValidate, userMiddlewares.passwordValidate, userControllers.login)

module.exports = app;