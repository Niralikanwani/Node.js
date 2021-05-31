// const path = require('path');
import path from 'path';

// const express = require('express');
import express from 'express';
import { Request, Response, NextFunction } from "express";

// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';

// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// const session = require('express-session');
import session from 'express-session';

const MongoDBStore = require('connect-mongodb-session')(session);

// const csrf = require('csurf');
import csrf from 'csurf';

// const flash = require('connect-flash');
import flash from 'connect-flash';

// const errorController = require('./controllers/error');
import * as errorController from './controllers/error';
// const User = require('./models/user');
import { User } from './models/user';

const MONGODB_URI =
  'mongodb+srv://root:NOvSqnV0lzmK3Fe5@cluster0.mbxze.mongodb.net/shop';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
import adminRoutes from './routes/admin';
// const shopRoutes = require('./routes/shop');
import shopRoutes from './routes/shop';
// const authRoutes = require('./routes/auth');
import authRoutes from './routes/auth';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req: any, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user: any) => {
      req.user = user;
      next();
    })
    .catch((err: Error) => console.log(err));
});

app.use((req: any, res: Response, next: NextFunction) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result: any) => {
    app.listen(8000);
  })
  .catch((err: Error) => {
    console.log(err);
  });
