const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://restaurant-user:testing123@mern-restaurant-site.6wrvvbr.mongodb.net/mern-restaurant-site?retryWrites=true&w=majority');
        console.log('Database connection succesfull');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

// ww zeqgox-Qamko8-vuvmyj