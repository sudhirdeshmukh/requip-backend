const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    status: { type: String, enum: ['new', 'used', 'unused'], required: true },
    price: {type: String, required: true},
    seller: {type: String, required: true},
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

module.exports = mongoose.model('Product', productSchema);
