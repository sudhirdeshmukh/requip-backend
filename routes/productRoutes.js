const express = require('express');
const router = express.Router();
const {createProduct, getProducts} = require('../controllers/ProductController');
const { create } = require('../models/Product');

router.post('/', createProduct);

router.get('/', getProducts);

module.exports = router;