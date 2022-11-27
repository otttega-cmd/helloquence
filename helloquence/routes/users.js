const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Route For You're So Cool (Define All Routes After the main route on this page here instead of in app.js)

router.get('/cool', (req, res, next) => {
  res.send("You're so cool");
});

module.exports = router;
