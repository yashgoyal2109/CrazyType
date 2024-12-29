
const Result = require('../models/Result');

const resultController = {
  submitResult: async (req, res) => {
    try {
      const { wpm, accuracy, rawWpm, characters, timeElapsed } = req.body;
      
      const result = new Result({
        user: req.user._id,
        wpm,
        accuracy,
        timeElapsed
      });
      
      await result.save();

      // Update user's stats
      const user = req.user;
      user.testsCompleted += 1;
      user.averageWPM = ((user.averageWPM * (user.testsCompleted - 1)) + wpm) / user.testsCompleted;
      user.averageAccuracy = ((user.averageAccuracy * (user.testsCompleted - 1)) + accuracy) / user.testsCompleted;
      user.highestWPM = Math.max(user.highestWPM, wpm);
      await user.save();

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getResults: async (req, res) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      const skip = (page - 1) * limit;

      const results = await Result.find({ user: req.user._id })
        .sort({ completedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Result.countDocuments({ user: req.user._id });

      res.json({
        results,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.export = resultController;