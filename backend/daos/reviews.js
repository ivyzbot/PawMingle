const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    receiverID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewType: {
      type: String,
      enum: ['Provider', 'Hirer'],
      required: true,
    },
    giverID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobID: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    score: { type: Number, enum: [1, 2, 3, 4, 5] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
