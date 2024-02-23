const reviewMdl = require('../models/reviews');

module.exports = { createReview };

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
