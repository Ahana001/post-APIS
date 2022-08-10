const Joi = require('joi');

const addPost = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    createdBy: Joi.string().required()
});

const updatePost = Joi.object().keys({
    id: Joi.string().required()
});
const deletePost = Joi.object().keys({
    id: Joi.string().required()
});
module.exports = {
    addPost,
    updatePost,
    deletePost
} 