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

  //res.render("index");
});

router.get("/swipeview", (req, res, next) => {
  Event.find({})
    .then(events => {
      res.render("swipeview", { events });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });

  //res.render("index");
});

module.exports = router;
