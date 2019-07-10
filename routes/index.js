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
      res.render("index", { events, user: req.user });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });
});

<<<<<<< HEAD
=======
/* GET profile page  get rid of*/
router.get("/profile", (req, res, next) => {
  Event.find({})
    .then(events => {
      res.render("profile", { user: req.user });
    })
    .catch(err => {
      console.log("Error while getting profile page: ", err);
    });
});

>>>>>>> eventdetailAlex
module.exports = router;
