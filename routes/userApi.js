const express = require('express');
const passport = require('passport');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userController = require('../controller/userController');

Router.post('/user/login', userController.user_login_post);

Router.post('/user/sign-up', userController.user_signup_post);


module.exports = Router;
