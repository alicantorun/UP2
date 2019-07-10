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
    console.log(events);
    res.render("protected/profile", { userInfo, events, user: req.user });
  });
});

module.exports = router;
