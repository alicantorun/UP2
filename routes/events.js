const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const loginCheck = require("../utils/loginCheck");

// const checksRole = role => {
//   return (req, res, next) => {
//     if (req.user.role === role) {
//       next();
//     } else {
//       res.redirect("/protected/profile");
//     }
//   };
// };

router.get("/createevent", loginCheck(), (req, res, next) => {
  console.log(req.user);
  res.render("events/createevent", {
    message: req.flash("error"),
    user: req.user
  });
});

router.post("/createevent", (req, res, next) => {
  const { name, description, date, keyCat, imageUrl, latitude, longtitude } = req.body;
  Event.create({
    name,
    imageUrl,
    description,
    keyCat,
    date,
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

////////

// router.get("/createevent-edit", loginCheck(), (req, res, next) => {
//   const event = req.body;
//   console.log(event);
//   res.render("events/createevent-edit", { event });
// });

////////

router.get("/:eventId", (req, res, next) => {
  Event.findById(req.params.eventId)
    .populate("creator")
    .then(event => {
      res.render("events/detail", { event, user: req.user });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:eventId/edit", (req, res, next) => {
  Event.findById(req.params.eventId)
    .populate("event")
    .then(event => {
      res.render("events/createevent-edit", { event });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/:eventId/edit", (req, res) => {
  const { name, imageUrl, description, date, keyCat } = req.body;

  Event.findByIdAndUpdate(req.params.eventId, {
    name,
    imageUrl,
    description,
    date,
    keyCat,
  })
    .then(() => {
      res.redirect(`/events/${req.params.eventId}`);
    })
    .catch(err => {
      console.log("Error while updating the event: ", err);
    });
});

////////

router.get(
  "/:eventId/delete",

  // checksRole("creator"),

  (req, res, next) => {
    const eventId = req.params.eventId;

    Event.deleteOne({ _id: eventId })
      .then(data => {
        res.redirect("/protected/profile");
      })
      .catch(err => {
        next(err);
      });
  }
);

// create a join event route
// post
// /:eventId

// /5d24b9b61999b82b5b216fac/join
router.post("/:eventId/join", loginCheck(), (req, res, next) => {
  Event.findByIdAndUpdate(req.params.eventId, {
    $push: { attendees: req.user._id }
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
      res.render("events/events", { eventsList: events, user: req.user });
    })
    .catch(err => {
      console.log("Some kind of ERROR", err);
    });
});

module.exports = router;
