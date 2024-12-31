const express = require("express");
const mongoose = require("mongoose");
const { signup, signin, logout, getCurrentUser } = require("./controller/controller");
const resultController = require("./controller/resultcontroller")
require('dotenv').config();
const cors = require("cors");
const auth = require("./middleware/auth")
const url = process.env.DATABASE_URL;
const cookieParser = require("cookie-parser");
const { leaderboard } = require("./controller/leadcontroller");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://crazy-type-gmww.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get("/",(req,res)=>{
  res.send("hello");
})
app.post("/signup", signup);
app.post("/signin",signin)
app.post("/logout",logout)
app.post("/results",auth,resultController.submitResult);
app.get("/results",auth,resultController.getResults);
app.get("/results/stats",auth,resultController.getUserStats);
app.get("/currentuser",auth,getCurrentUser);
app.get("/leaderboard",leaderboard);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

