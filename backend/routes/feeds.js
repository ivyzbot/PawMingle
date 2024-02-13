var express = require('express');
var router = express.Router();

// under the route /feeds
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
