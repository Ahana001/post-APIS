const mongoose = require('mongoose');
const { DB_PASS, DB_USER } = require('./config.js');

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ty7tw33.mongodb.net/?retryWrites=true&w=majority`);
mongoose.connection.on('connected', () => {
    console.log('mongodb connected');
});
mongoose.connection.on('error', (err) => {
    console.log('error', err.message);
});
mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected');
});

module.exports = mongoose;