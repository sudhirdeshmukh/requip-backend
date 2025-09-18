require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');         
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();                  


app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);

app.get('/', (req, res) => res.send('API is running...'));


connectDB();

const PORT = process.env.PORT || 5500;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
