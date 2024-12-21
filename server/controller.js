const { userSchema } = require("./validator");
const User = require("./schema");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ username, email, password });

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error caught:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
