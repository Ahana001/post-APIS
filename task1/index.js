require('dotenv').config();
require('./connection.js');
const { PORT } = require('./config.js');
const port = PORT || 5500;
const HOST = '127.0.0.1';

const express = require('express');
const app = express();

app.listen(port, HOST, () => {
    console.log(`server started on ${HOST}:${port}`);
});