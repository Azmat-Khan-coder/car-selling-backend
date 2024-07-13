require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./database/connection.js");
const authRoutes = require("./routes/authRoutes.js");
const carRoutes = require("./routes/carRoutes.js");
const User = require("./models/userModel.js");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/", (_, res) => {
  res.send("Welcome to my Node.js app!");
});
app.use("/api/login", authRoutes);
app.use("/api/cars", carRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
