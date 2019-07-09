const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const loginCheck = require("../utils/loginCheck");

router.get("/createevent", loginCheck(), (req, res, next) => {
  res.render("events/createevent", { message: req.flash("error") });
});

router.post("/createevent", loginCheck(), (req, res, next) => {
  const { name, description, imageUrl, latitude, longtitude } = req.body;
  Event.create({
    name,
    imageUrl,
    description,
    creator: req.user._id,
    location: {
      type: "Point",
      coordinates: [latitude, longtitude]
    }
  })
    .then(data => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/events", (req, res, next) => {
  Event.find({})
    .then(events => {
      console.log(events);
      res.render("events/events", { eventsList: events });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });
});

module.exports = router;
