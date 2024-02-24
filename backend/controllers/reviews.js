const reviewMdl = require('../models/reviews');

module.exports = { createReview, getReviewCount, getUserReviews };

async function createReview(req, res) {
  try {
    const reviewData = await reviewMdl.createReview(req.body);
    // console.log('controller-createJob', jobData);
    if (!reviewData.success) {
      res.status(400).json({ errorMsg: reviewData.error });
      return;
    }
    res.json(reviewData);
  } catch (err) {
    console.log('controller-create-review-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getReviewCount(req, res) {
  const userID = req.params.userid;
  try {
    const reviewData = await reviewMdl.getReviewCount(userID);
    // console.log('controller-getReviewCount', jobData);
    if (!reviewData.success) {
      res.status(400).json({ errorMsg: reviewData.error });
      return;
    }
    res.json(reviewData);
  } catch (err) {
    console.log('controller-get-review-count', err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getUserReviews(req, res) {
  const userID = req.params.userid;
  try {
    const reviewData = await reviewMdl.getUserReviews(userID);
    // console.log('controller-getOneJob', jobData);
    if (!reviewData.success) {
      res.status(400).json({ errorMsg: reviewData.error });
      return;
    }
    res.json(reviewData);
  } catch (err) {
    console.log('controller-get-user-reviews-err', err);
    res.status(500).json({ errorMsg: err.message });
  }
}
