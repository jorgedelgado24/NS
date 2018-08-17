// *****************************************************************************
// Passport.js - This file is the user authentication component.
//
// ******************************************************************************
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
//Configuration
var db = require('../../db');

passport.use(new Strategy(
  function (username, password, done) {
    db.users.findByUsername(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.users.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;