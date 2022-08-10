const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});
schema.pre(
    'save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
);
schema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}
const userCollection = mongoose.model('user', schema);

module.exports = userCollection;