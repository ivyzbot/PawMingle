const reviewsDao = require('../daos/reviews');

module.exports = { createReview };

async function createReview(body) {
  const newReview = await reviewsDao.create(body);
  // console.log('Create new review: ', newReview);
  return { success: true, data: newReview };
}
