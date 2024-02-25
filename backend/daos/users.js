const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
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

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    iterations: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
    expire_at: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    jobsTaken: {
      type: [Schema.Types.ObjectId],
      ref: 'Job',
    },
    petsOwn: [petSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
