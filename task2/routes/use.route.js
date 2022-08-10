const express = require('express');
const { validation } = require('../middlewares/req.validate');
const router = express.Router();
const { userController } = require('../controllers');
const { registerUser } = require('../validations/user.validation');
const passport = require('passport');
require('../config/passport')(passport);

router.post('/login', passport.authenticate('jwt', { session: false }), userController.loginUser);
router.post('/register', validation(registerUser, 'body'), userController.registerUser);

module.exports = router;