const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    wpm: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    timeElapsed: {
      type: Number,
      required: true  
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Result = mongoose.model('Result', resultSchema);
  module.exports = Result;
  