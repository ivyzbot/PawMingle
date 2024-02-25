const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    petDescription: {
      type: String,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pet', petSchema);
