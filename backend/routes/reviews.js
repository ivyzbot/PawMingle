var express = require('express');
var router = express.Router();
var reviewsCtrl = require('../controllers/reviews');

// under the route /reviews
router.post('/create', reviewsCtrl.createReview);

module.exports = router;
