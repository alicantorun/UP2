const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const loginCheck = require("../utils/loginCheck");

router.get("/createevent", loginCheck(), (req, res, next) => {
<<<<<<< HEAD
  console.log(req.user);
  res.render("events/createevent", {
    message: req.flash("error"),
    user: req.user
  });
=======
  res.render("events/createevent", { user: req.user, message: req.flash("error")});
>>>>>>> eventdetailAlex
});

router.post("/createevent", (req, res, next) => {
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
<<<<<<< HEAD
    .populate("creator")
    .then(event => {
      res.render("events/detail", { event, user: req.user });
    })
    .catch(err => {
      next(err);
    });
});
=======
  .populate('creator')
  .then(event => {
    res.render('events/detail', { user: req.user, event })
  }).catch(err => {
    next(err)
  })
})
>>>>>>> eventdetailAlex

// create a join event route
// post
// /:eventId

// /5d24b9b61999b82b5b216fac/join
<<<<<<< HEAD
router.post("/:eventId/join", loginCheck(), (req, res, next) => {
  Event.findByIdAndUpdate(req.params.eventId, {
    $push: { attendees: req.user._id }
=======
router.post('/:eventId/join', loginCheck(), (req, res, next) => {
  Event.findByIdAndUpdate(req.params.eventId, { $push: { attendees: req.user._id } }).then(() => {
    res.redirect('/protected/profile')
  }).catch(err => {
    next(err)
>>>>>>> eventdetailAlex
  })
    .then(() => {
      res.redirect("/protected/profile");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/", (req, res, next) => {
  Event.find({})
    .populate("creator")
    .then(events => {
<<<<<<< HEAD
      res.render("events/events", { eventsList: events, user: req.user });
=======
      res.render("events/events", { user: req.user, eventsList: events });
>>>>>>> eventdetailAlex
    })
    .catch(err => {
      console.log("Some kind of ERROR", err);
    });
});

module.exports = router;
