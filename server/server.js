const express = require("express");
const mongoose = require("mongoose");
const { signup, signin } = require("./controller/controller");
const resultController = require("./controller/resultcontroller")
require('dotenv').config();
const cors = require("cors");
const url = process.env.DATABASE_URL;

const app = express();

app.use(express.json());
app.use(cors({
  credentials:true,
  origin: ["http://localhost:3000", "http://localhost:5173"]
}));

mongoose.connect(url)


app.post("/signup", signup);
app.post("/signin",signin)
app.post("/result",resultController.submitResult);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
