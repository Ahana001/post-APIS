const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    signToken: (id) => {
        return new Promise((resolve, reject) => {
            const payload = {
            };
            const secret = process.env.TOKEN_SECRET;
            const option = {
                expiresIn: '1h',
                issuer: 'Ankita',
                audience: id.toString()
            }
            jwt.sign(payload, secret, option, (err, token) => {
                if (err) {
                    reject();
                } else {
                    resolve(token);
                }
            })
        })
    }
}