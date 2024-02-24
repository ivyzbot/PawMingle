const mongoose = require('mongoose');
const reviewsDao = require('../daos/reviews');

module.exports = { createReview, getReviewCount, getUserReviews };

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

async function getUserReviews(userID) {
  const receiveReviews = await reviewsDao
    .find({ receiverID: userID })
    .populate('giverID', ['_id', 'name']);
  // console.log('Get userJobs: ', postJobs);
  const giveReviews = await reviewsDao
    .find({ giverID: userID })
    .populate('receiverID', ['_id', 'name']);
  const userReviews = {
    receiveReviews: receiveReviews,
    giveReviews: giveReviews,
  };
  return { success: true, data: userReviews };
}
