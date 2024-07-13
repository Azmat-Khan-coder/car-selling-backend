const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const userGenerate = async () => {
  try {
    const existingUser = await User.findOne({ email: "Amjad@desolint.com" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("123456abc", 10);
      const user = new User({
        email: "Amjad@desolint.com",
        password: hashedPassword,
      });
      await user.save();
      console.log("User added successfully.");
    } else {
      console.log("User already exists in the database.");
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("User already exists in the database.");
    } else {
      console.error("Error adding user:", error);
    }
  }
};

module.exports = userGenerate;
