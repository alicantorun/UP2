const express = require("express");
const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', "email", 'name', 'gender', 'picture.type(large)']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ facebookId: profile.id })
        .then(user => {
          if (user) return done(null, user);

          return User.create({
            facebookId: profile.id,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            image: profile.photos[0].value

          }).then(newUser => {
            return done(null, newUser);
          });
        })
        .catch(err => {
          done(err);
        });
      
    }
  )
);

router.get("/facebook",passport.authenticate("facebook"));
router.get("/facebook/callback",
passport.authenticate("facebook", { successRedirect: "/profile",
failureRedirect: "/login"}));


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
