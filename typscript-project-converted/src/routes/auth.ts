// const express = require('express');
import { Router } from 'express';

const authController = require('../controllers/auth');

// const router = express.Router();
const router = Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

// module.exports = router;
export default router;