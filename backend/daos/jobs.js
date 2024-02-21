const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    posterID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    petType: {
      type: String,
      enum: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Hamster', 'Others'],
      required: true,
    },
    jobType: {
      type: String,
      enum: ['Walking', 'Feeding', 'Daycare', 'Boarding', 'Others'],
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    jobStatus: {
      type: String,
      enum: ['Pending', 'Taken', 'Completed'],
      default: 'Pending',
      required: true,
    },
    candidates: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    selected: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
