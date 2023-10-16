const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const {User} = require('../models/');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {unauthorizedResponse} = require('../services/response.service')


const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async(payload, done) => {
   try {
      const user = await User.findByPk(payload.id);
      if (user) {
          done(null, user);
      } else {
          return done(null, false);
      }
  } catch (error) {
      done(error, false);
  }
}))

function auth(req, res, next) {
   passport.authenticate('jwt', { session: false }, (err, user, info) => {
       if (err) {
           return next(err);
       }
       if (!user) {
           return unauthorizedResponse(req, res, 'Unauthorized')
       }

       // Jika token kadaluwarsa, tolak permintaan
       const tokenExpirationDate = jwt.decode(req.headers.authorization.split(' ')[1]).exp * 1000;
       if (Date.now() > tokenExpirationDate) {
           return unauthorizedResponse(req, res, 'Unauthorized')
       }

       req.user = user;
       return next();
   })(req, res, next);
}  


module.exports = {
   jwtOptions,
   auth
};