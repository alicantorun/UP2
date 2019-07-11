const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const loginCheck = require("../utils/loginCheck");
// router.use(loginCheck());

router.get("/profile", loginCheck(), (req, res) => {
  const userInfo = req.user;
  Event.find({
    $or: [{ creator: req.user._id }, { attendees: req.user._id }]
  })
    .populate("creator")
    .then(events => {
      events = events.map(event => {

        if (event.creator && event.creator._id.toString() === req.user._id.toString()) {
          console.log("owner");
          event.owner = true;
        }
        return event;
      });

      // events = events.map(event => {

      //   if (event.creator && event.creator._id.toString() === req.user._id.toString()) {
      //     console.log("owner");
      //     event.mySlogan = "I am the owner of the event: ";
      //   }
      //   return event;
      // });
      res.render("protected/profile", { userInfo, events, user: req.user });
    });
});

router.get(
  "/profile/delete",

  // checksRole("creator"),

  (req, res, next) => {
    const userId = req.user._id;

    User.deleteOne({ _id: userId })
      .then(data => {
        req.logout();
        res.redirect("/");
      })
      .catch(err => {
        next(err);
      });
  }
);

module.exports = router;
