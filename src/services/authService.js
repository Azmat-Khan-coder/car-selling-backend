const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports = { login };
