const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const hbs = require("hbs");

//Helper function to parse and display data on index

/* GET home page */
router.get("/", (req, res, next) => {
  Event.find({})
    .then(events => {
      res.render("index", { events, user: req.user });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });
});

module.exports = router;
