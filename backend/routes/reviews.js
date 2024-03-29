var express = require('express');
var router = express.Router();
var reviewsCtrl = require('../controllers/reviews');

// under the route /reviews
router.post('/create', reviewsCtrl.createReview);
router.get('/getcount/:userid', reviewsCtrl.getReviewCount);
router.get('/getall/:userid', reviewsCtrl.getUserReviews);

module.exports = router;
