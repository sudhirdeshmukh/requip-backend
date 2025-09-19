const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { image, name, status, price, seller, sellerId } = req.body;
        const product = new Product({ image, name, status, price, seller, sellerId });
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
        res.json(products);
    }
    catch (e) {
        res.status(500).json({ message: 'Error fetching products', e })
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProduct);
    }
    catch (e) {
        res.status(500).json({ message: 'Error updating product', e })
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (e) {
        res.status(500).json({ message: 'Error deleting product', e })
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };