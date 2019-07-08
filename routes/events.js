const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
// const Event = require("../models/Event");

router.get("/createevent", (req, res, next) => {
  res.render("events/createevent", { message: req.flash("error") });
});

router.post("/createevent", (req, res, next) => {
  const { name, description, latitude, longtitude } = req.body;

  console.log(name, description, latitude, longtitude);

  // Event.create({
  //   name,
  //   imageUrl,
  //   location: {
  //     type: "Point",
  //     coordinates: [latitude, longitude]
  //   }
  // })

  // .then(data => {
  //   res.redirect("/");
  // })
  // .catch(err => {
  //   console.log(err);
  // });
});

module.exports = router;
