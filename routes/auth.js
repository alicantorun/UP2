const express = require("express");
const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { user: req.user, message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/signup",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { user: req.user });
});

router.get("/signup-edit", (req, res, next) => {
  const user = req.user;
  console.log(user);
  res.render("auth/signup-edit", { user });
});

router.post("/signup-edit", (req, res) => {
  const user = req.user;
  let int = [];

  const {
    sport,
    party,
    casual,
    culture,
    nature,
    family,
    name,
    lastname,
    password,
    age,
    languages,
    keyInt,
    city,
    userType,
    bio,
    imageUrl
  } = req.body;
  if (!!sport) {
    int.push("sport");
  }
  if (!!party) {
    int.push("party");
  }
  if (!!casual) {
    int.push("casual");
  }
  if (!!culture) {
    int.push("culture");
  }
  if (!!nature) {
    int.push("nature");
  }
  if (!!family) {
    int.push("family");
  }

  User.findByIdAndUpdate(req.user._id, {
    name,
    lastname,
    keyInt: int,
    password,
    age,
    languages,
    city,
    userType,
    bio,
    imageUrl
  })
    .then(() => {
      res.redirect(`/protected/profile`);
    })
    .catch(err => {
      console.log("Error while updating the book: ", err);
    });
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  let int = [];
  const {
    sport,
    party,
    casual,
    culture,
    nature,
    family,
    name,
    lastname,
    username,
    password,
    age,
    languages,
    keyInt,
    city,
    userType,
    bio,
    imageUrl
  } = req.body;
  if (!!sport) {
    int.push("sport");
  }
  if (!!party) {
    int.push("party");
  }
  if (!!casual) {
    int.push("casual");
  }
  if (!!culture) {
    int.push("culture");
  }
  if (!!nature) {
    int.push("nature");
  }
  if (!!family) {
    int.push("family");
  }

  if (username === "" || password === "") {
    res.render("auth/signup", {
      user: req.user,
      message: "Indicate username and password"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        user: req.user,
        message: "The username already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      name,
      lastname,
      age,
      languages,
      keyInt: int,
      city,
      userType,
      bio,
      imageUrl
    });

    newUser
      .save()
      .then(() => {
        req.logIn(newUser, () => res.redirect("/"));
      })
      .catch(err => {
        console.log(err);
        res.render("auth/signup", {
          user: req.user,
          message: "Something went wrong!"
        });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//       profileFields: [
//         "id",
//         "displayName",
//         "email",
//         "name",
//         "gender",
//         "picture.type(large)"
//       ]
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       User.findOne({ facebookId: profile.id })
//         .then(user => {
//           if (user) return done(null, user);

//           return User.create({
//             facebookId: profile.id,
//             name: profile.name.givenName,
//             lastname: profile.name.familyName,
//             image: profile.photos[0].value
//           }).then(newUser => {
//             return done(null, newUser);
//           });
//         })
//         .catch(err => {
//           done(err);
//         });
//     }
//   )
// );

// router.get("/facebook", passport.authenticate("facebook"));
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/profile",
//     failureRedirect: "/login"
//   })
// );
