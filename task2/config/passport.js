const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userCollection = require('../model/user.model');

module.exports = function (passport) {
    passport.use(
        new JwtStrategy({
            secretOrKey: process.env.TOKEN_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
            function (jwt_paload, next) {
                userCollection.findOne({ _id: jwt_paload.aud }, (err, user) => {
                    if (err) {
                        return next(err, false)
                    }
                    if (user) {
                        next(null, user);
                    }
                });
            })
    )
}