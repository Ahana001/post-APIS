const userCollection = require('../model/user.model');
const { signToken } = require('../utils/jwt');

const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email: email });
    if (!user) {
        const newUser = await userCollection.create({
            email,
            password
        });
        const token = await signToken(newUser._id);
        if (newUser) {
            res.status(201).json({
                message: "register successfully",
                token: token
            });
        }
    } else {
        const token = await signToken(user._id);
        if (user) {
            res.status(201).json({
                token: token
            });
        }
    }
}
const loginUser = (req, res) => {
    res.send(req.user);
}

module.exports = {
    registerUser,
    loginUser
}