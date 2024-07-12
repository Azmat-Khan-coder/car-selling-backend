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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api/login", authRoutes);
app.use("/api/cars", carRoutes);

// Manually add the user
const addUser = async () => {
  const existingUser = await User.findOne({ email: "Amjad@desolint.com" });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("123456abc", 10);
    const user = new User({
      email: "Amjad@desolint.com",
      password: hashedPassword,
    });
    await user.save();
  }
};
addUser();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
