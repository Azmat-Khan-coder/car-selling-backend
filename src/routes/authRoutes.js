const express = require("express");
const { login } = require("../services/authService.js");
const {
  loginValidationRules,
  validate,
} = require("../validators/authValidator.js");
const router = express.Router();

router.post("/", loginValidationRules, validate, login);

module.exports = router;
