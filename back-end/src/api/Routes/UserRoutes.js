const { Router } = require('express');
const userControllers = require('../Controllers/UserControllers');
const userMiddlewares = require('../Middlewares/LoginValidate');

const userRoutes = Router();

userRoutes.post('/login', 
userMiddlewares.emailValidate, userMiddlewares.passwordValidate, userControllers.login);

userRoutes.post('/register',
    userMiddlewares.emailValidate, 
    userMiddlewares.passwordValidate, 
    userMiddlewares.nameValidate, 
    userControllers.postUser);

module.exports = userRoutes;
