const Result = require('../models/Result'); 

const resultController = {
  submitResult: async (req, res) => {
    console.log("Received result submission request");
    console.log("Request body:", req.body);
    console.log("User:", req.user); 
    
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { wpm, accuracy, timeElapsed } = req.body;
      
      if (!wpm || !accuracy || !timeElapsed) {
        return res.status(400).json({ 
          message: "Missing required fields",
          required: { wpm, accuracy, timeElapsed }
        });
      }

      const result = new Result({
        user: req.user._id,
        wpm,
        accuracy,
        timeElapsed
      });
      
      const savedResult = await result.save();
      console.log("Saved result:", savedResult); 
      res.status(201).json(savedResult);
    } catch (error) {
      console.error("Error submitting result:", {
        error: error.message,
        stack: error.stack
      });
      res.status(400).json({ message: error.message });
    }
  },

  getResults: async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

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
      console.error("Error getting results:", error);
      res.status(500).json({ message: error.message });
    }
  },
  getUserStats: async (req, res) => {
    try {
      const stats = await Result.aggregate([
        { $match: { user: req.user._id } },
        { 
          $group: {
            _id: null,
            averageWpm: { $avg: '$wpm' },
            highestWpm: { $max: '$wpm' },
            totalTests: { $sum: 1 },
            averageAccuracy: { $avg: '$accuracy' }
          }
        }
      ]);

      res.json(stats[0] || {});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = resultController;