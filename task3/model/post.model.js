const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    createdBy: {
        type: String
    },
    userId: {
        type: String
    },
    geolocation: [
        {
            latitude: String,
            longitude: String
        }
    ]
});


const postCollection = mongoose.model('post', schema);

module.exports = postCollection;
