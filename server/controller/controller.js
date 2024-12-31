const { userSchema } = require("../validator/validator");
const bcrypt = require("bcryptjs");
const signInSchema = require("../validator/validator")
const { generateToken } = require("../utils/token")
const { formatUserResponse } = require("../utils/token");
const User = require("../models/user");


exports.signup = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;

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



exports.signin = async (req, res) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid Credentials" })


    user.lastLogin = new Date();
    await user.save();

    generateToken(res, user._id.toString());

    res.status(200).json({
      success: true,
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("Error caught:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.status(200).send({ message: "Logged out successfully" });
};


exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: formatUserResponse(user)
    });
  } catch (error) {
    console.error("Error caught:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};