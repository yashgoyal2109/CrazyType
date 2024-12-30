const Result = require('../models/results');

const resultController = {
  submitResult: async (req, res) => {
    console.log("Received result submission request");
    try {
      const { wpm, accuracy, rawWpm, characters, timeElapsed } = req.body;
      
      const result = new Result({
        user: "677285ef81a24c46e0c633c3", // hardcoded user's id
        wpm,
        accuracy,
        timeElapsed
      });
      
      const savedresult = await result.save();
      res.status(201).json(savedresult);
    } catch (error) {
      console.error("Error submitting result:", error);
      res.status(400).json({ message: error.message });
    }
  },
  getResults: async (req, res) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      const skip = (page - 1) * limit;
      const results = await Result.find({ user: "677285ef81a24c46e0c633c3" }) // using hardcoded user id
        .sort({ completedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
      const total = await Result.countDocuments({ user: "677285ef81a24c46e0c633c3" });
      res.json({
        results,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error("Error getting results:", error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = resultController;