const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { image, name, status, price } = req.body;
        const product = new Product({ image, name, status, price });
        await product.save();
        res.status(201).json(product);
    }
    catch (e) {
        res.status(500).json({ message: 'Error creating product', e });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.join(products);
    }
    catch (e) {
        res.status(500).json({ message: 'Error fetching products', e })
    }
};

module.exports = { createProduct, getProducts };