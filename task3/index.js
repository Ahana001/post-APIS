require('dotenv').config();
require('./config/connection');
const { PORT } = require('./config/config');
const port = PORT || 3000;
const passport = require('passport');
const express = require('express');
const app = express();
app.use(passport.initialize());
const { userRoutes, postRoutes } = require('./routes');
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//catch errors here
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status,
        Error: err.message
    });
})
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})
