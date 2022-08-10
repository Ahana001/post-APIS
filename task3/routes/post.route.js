const express = require('express');
const { validation } = require('../middlewares/req.validate');
const router = express.Router();
const { postController } = require('../controllers');
const passport = require('passport');
require('../config/passport')(passport);
const { addPost, updatePost, deletePost } = require('../validations/post.validation');

router.get('/', passport.authenticate('jwt', { session: false }), postController.getPost);
router.post('/add', validation(addPost, 'body'), passport.authenticate('jwt', { session: false }), postController.addPost);
router.put('/update/:id', validation(updatePost, 'params'), passport.authenticate('jwt', { session: false }), postController.updatePost);
router.delete('/delete/:id', validation(deletePost, 'params'), passport.authenticate('jwt', { session: false }), postController.deletePost);
router.get('/geolocation', passport.authenticate('jwt', { session: false }), postController.getGeoPost);

module.exports = router;