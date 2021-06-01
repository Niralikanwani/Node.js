// const Product = require('../models/product');
import { Product } from '../models/product';
// const Order = require('../models/order');
import { Order } from '../models/order';
import { Request, Response, NextFunction } from "express";
import { AnyCnameRecord } from 'dns';

exports.getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .then((products: any) => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err : Error ) => {
      console.log((err));
    });
};

exports.getProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product: any) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch((err : Error ) => console.log((err)));
};

exports.getIndex = (req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .then((products: any) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err : Error ) => {
      console.log((err));
    });
};

exports.getCart = (req: any, res: Response, next: NextFunction) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user: any) => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch((err : Error ) => console.log((err)));
};

exports.postCart = (req: any, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product: any) => {
      return req.user.addToCart(product);
    })
    .then((result: any) => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req: any, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result: any) => {
      res.redirect('/cart');
    })
    .catch((err : Error ) => console.log((err)));
};

exports.postOrder = (req: any, res: Response, next: NextFunction) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user: any) => {
      const products = user.cart.items.map((i: any) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then((result: any) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err : Error ) => console.log((err)));
};

exports.getOrders = (req: any, res: Response, next: NextFunction) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders: any) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch((err : Error ) => console.log((err)));
};
