const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        console.log('Monogodb connected...');
    }
    catch (e) {
        console.log('Monogodb connection error:', e);
        process.exit(1);
    }
};

module.exports = connectDB;