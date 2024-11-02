const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../db/userQueries');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dinkelberg'
};

module.exports = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await db.userGet(payload.user.userId);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done (err, false);
    }
})