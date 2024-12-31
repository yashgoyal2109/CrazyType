const Result = require("../models/Result");

exports.leaderboard = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("user", "username") // Populate the `user` field with the `username`
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    // Group and aggregate results
    const leaderboard = results.reduce((acc, result) => {
      const { username } = result.user;
      if (!acc[username]) {
        acc[username] = { avgWpm: 0, avgAccuracy: 0, totalTests: 0 };
      }
      acc[username].avgWpm += result.wpm;
      acc[username].avgAccuracy += result.accuracy;
      acc[username].totalTests += 1;
      return acc;
    }, {});

    // Calculate averages and sort by WPM
    const sortedLeaderboard = Object.entries(leaderboard)
      .map(([username, data]) => ({
        username,
        avgWpm: (data.avgWpm / data.totalTests),
        avgAccuracy: (data.avgAccuracy / data.totalTests),
        totalTests: data.totalTests
      }))
      .sort((a, b) => b.avgWpm - a.avgWpm); // Sort by avgWpm in descending order

    res.json(sortedLeaderboard);
  } catch (error) {
    console.error("Server Error in leaderboard endpoint:", error);
    res.status(500).json({ error: error.message });
  }
};
