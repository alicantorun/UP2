const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  // const { name, lastname, username, password, age, languages, keyInterests, userType, bio, facebookId  } = req.user;

  // render the form that posts the information to the route below
  // populate the fields in the inputs in the profile view with the info from the user
  res.render("profile", { user: req.user });
});

// router.post("/", (req, res, next) => {
//   const { name, lastname, username, password, age, languages, keyInterests, userType, bio } = req.body;

//   User.create({
//     name,
//     lastname,
//     username,
//     password,
//     age,
//     languages,
//     keyInterests,
//     userType,
//     bio,
//   })
//     .then(data => {
//       res.send(data)
//       // res.redirect("/");
//     })
//     .catch(err => {
//       console.log(err);
//     });
//  });

module.exports = router;
