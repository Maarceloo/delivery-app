const { Router } = require('express');
const userControllers = require('../Controllers/UserControllers');
const userMiddlewares = require('../Middlewares/LoginValidate');
const { jwtValidate } = require('../Utils/Jwt');

const userRoutes = Router();

userRoutes.get('/users', userControllers.getSellers);

userRoutes.get('/users/admin', userControllers.getUsers);

userRoutes.post('/login', 
userMiddlewares.emailValidate, userMiddlewares.passwordValidate, userControllers.login);

userRoutes.post('/register',
    userMiddlewares.emailValidate, 
    userMiddlewares.passwordValidate, 
    userMiddlewares.nameValidate, 
    userControllers.postUser);

userRoutes.post('/register/admin',
    jwtValidate,
    userMiddlewares.emailValidate, 
    userMiddlewares.passwordValidate, 
    userMiddlewares.nameValidate, 
    userControllers.adminPostUser);

userRoutes.delete('/users/admin', userControllers.deleteUser);

module.exports = userRoutes;
