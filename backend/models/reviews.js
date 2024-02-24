const mongoose = require('mongoose');
const reviewsDao = require('../daos/reviews');

module.exports = { createReview, getReviewCount };

async function createReview(body) {
  const newReview = await reviewsDao.create(body);
  // console.log('Create new review: ', newReview);
  return { success: true, data: newReview };
}

async function getReviewCount(userID) {
  const reviewsHirer = await reviewsDao.aggregate([
    {
      $match: {
        receiverID: new mongoose.Types.ObjectId(userID),
        reviewType: 'Hirer',
      },
    },
    { $group: { _id: '$receiverID', avg: { $avg: '$score' } } },
  ]);

  const reviewsProvider = await reviewsDao.aggregate([
    {
      $match: {
        receiverID: new mongoose.Types.ObjectId(userID),
        reviewType: 'Provider',
      },
    },
    { $group: { _id: '$receiverID', avg: { $avg: '$score' } } },
  ]);

  const reviewsCount = {
    reviewsHirer: reviewsHirer,
    reviewsProvider: reviewsProvider,
  };
  // console.log('Review Count: ', reviewsCount);
  return { success: true, data: reviewsCount };
}
