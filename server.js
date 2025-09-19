require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');         
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');
const { isAuthenticated } = require('./middleware/authMiddleware');

const app = express();                  

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/api/products', isAuthenticated, productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chats', isAuthenticated, chatRoutes);

app.get('/', (req, res) => res.send('API is running...'));


connectDB();

const PORT = process.env.PORT || 5500;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
