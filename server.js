// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var express = require("express");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;

// Sets up the Express App
// =============================================================
var app = express();
// Set the port of our application
var PORT = process.env.PORT || 3000;

// Requiring Models
var db = require("./models");
//This model is the user data as model.
var user = require("./db");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public/"));

// Passport Middleware. Make sure to npm install "Morgan" as well.
app.use(require('cookie-parser')());
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Passport initialization and keep the session.
app.use(passport.initialize());
app.use(passport.session());

// Passport uses "strategies" for authentication. We are using "passport-local" strategy"
passport.use(new Strategy(
  function(username, password, done) {
    user.users.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  })
);

// Serialize uses a unique cookie that identifies the session.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize uses a unique cookie that identifies the session.
passport.deserializeUser(function(id, done) {
  user.users.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

// Handlebars as the view engine
app.engine("handlebars",
  exphbs({defaultLayout: "main"})
);

// Handlebars as the view engine
app.set("view engine", "handlebars");

// Routes
// =============================================================
// Requiring the routes file in the routes folder
require("./routes/Routes")(app);
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Syncing sequelize models, start Express app, begin listening to client requests
// ============================================================= 
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });
});

// Export stuff? Maybe?
module.exports = app;