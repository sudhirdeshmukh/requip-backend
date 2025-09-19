const express = require('express');
const router = express.Router();
const {createProduct, getProducts, updateProduct, deleteProduct, markAsSold, markAsArchived} = require('../controllers/ProductController');

router.post('/', createProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);

router.put('/:id/mark-as-sold', markAsSold);

router.put('/:id/mark-as-archived', markAsArchived);

router.delete('/:id', deleteProduct);

module.exports = router;