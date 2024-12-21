const express = require("express");
const mongoose = require("mongoose");
const { signup } = require("./controller");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://lucifer:xnve4729@cluster0.dvhia4y.mongodb.net/")



app.post("/signup", signup);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
