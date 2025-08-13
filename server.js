require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(5500, '0.0.0.0', () => {
    console.log(`Server is runninng on port 5500`);
});