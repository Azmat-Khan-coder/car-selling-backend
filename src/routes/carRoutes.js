const express = require("express");
const { submitCar } = require("../services/carService.js");
const { authenticate } = require("../middleware/authMiddleware.js");
const {
  submitCarValidationRules,
  validate,
} = require("../validators/carValidator");
const router = express.Router();

router.post("/", authenticate, submitCarValidationRules, validate, submitCar);

module.exports = router;
