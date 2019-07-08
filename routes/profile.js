const express = require('express');
const router  = express.Router();


router.get('/', (req, res, next) => {
  // information for the user is in req.user
  console.log(req.usern )
  // render the correct page
  res.render('index');
});

module.exports = router