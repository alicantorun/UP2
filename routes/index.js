const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const hbs = require("hbs");

//Helper function to parse and display data on index
hbs.registerHelper("JSON", data => JSON.stringify(data));

/* GET home page */
router.get("/", (req, res, next) => {
  Event.find({})
    .then(events => {
      res.render("index", { events });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });
});

/* GET profile page */
router.get("/profile", (req, res, next) => {
  Event.find({})
    .then(events => {
      res.render("profile");
    })
    .catch(err => {
      console.log("Error while getting profile page: ", err);
    });
});

module.exports = router;
