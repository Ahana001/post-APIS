const createError = require('http-errors');

const validation = (schema, property) => {
    return async (req, res, next) => {
        const { error, value } = schema.validate(req[property]);
        if (error) {
            let err = error.details.map(error => error.message)
            next(createError.BadRequest(`validation Error : ${err}`));
        } else {
            next();
        }
    }
}
module.exports = { validation };