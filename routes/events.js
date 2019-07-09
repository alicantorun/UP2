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



router.get("/:eventId", (req, res, next) => {
  Event.findById(req.params.eventId)
  .populate('creator')
  .then(event => {
    res.render('events/detail', { event })
  }).catch(err => {
    next(err)
  })
})

// create a join event route
// post
// /:eventId

// /5d24b9b61999b82b5b216fac/join
router.post('/:eventId/join', (req, res, next) => {
  Event.findByIdAndUpdate(req.params.eventId, { $push: { attendees: req.user._id } }).then(() => {
    res.redirect('/protected/profile')
  }).catch(err => {
    next(err)
  })
})


router.get("/", (req, res, next) => {
  Event.find({})
    .populate('creator')
    .then(events => {
      res.render("events/events", { eventsList: events });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });
});

module.exports = router;
