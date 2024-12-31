const express = require("express");
const mongoose = require("mongoose");
const { signup, signin, logout } = require("./controller/controller");
const resultController = require("./controller/resultcontroller")
require('dotenv').config();
const cors = require("cors");
const auth = require("./middleware/auth")
const url = process.env.DATABASE_URL;
const cookieParser = require("cookie-parser")


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.post("/signup", signup);
app.post("/signin",signin)
app.post("/logout",logout)
app.post("/results",auth,resultController.submitResult);
app.get("/results",auth,resultController.getResults);
app.get("/results/stats",auth,resultController.getUserStats);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

