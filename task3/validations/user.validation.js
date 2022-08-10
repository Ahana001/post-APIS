const Joi = require('joi');

const registerUser = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
});

module.exports = {
    registerUser
}