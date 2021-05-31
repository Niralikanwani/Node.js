// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';
// const sendgridTransport = require('nodemailer-sendgrid-transport');
// import sendgridTransport from 'nodemailer-sendgrid-transport';
import { Request, Response, NextFunction } from "express";
// import flash from 'express-flash';
// import session from 'express-session';

const User = require('../models/user');

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         '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'
//     }
//   })
// );

exports.getLogin = (req: Request, res: Response, next: NextFunction) => {
  let message = req.flash('error') as any;
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req: Request, res: Response, next: NextFunction) => {
  let message = req.flash('error') as any;
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req: any, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err: Error) => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch((err: Error) => console.log(err));
};

exports.postSignup = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc: any) => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          // return transporter.sendMail({
          //   to: email,
          //   from: 'shop@node-complete.com',
          //   subject: 'Signup succeeded!',
          //   html: '<h1>You successfully signed up!</h1>'
          // });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

exports.postLogout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err: Error) => {
    console.log(err);
    res.redirect('/');
  });
};
