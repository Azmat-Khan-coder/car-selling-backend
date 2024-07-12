const { check, validationResult } = require("express-validator");

const submitCarValidationRules = [
  check("model")
    .isLength({ min: 3 })
    .withMessage("Car model must be at least 3 characters long"),
  check("price").isNumeric().withMessage("Price must be a number"),
  check("phone")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be exactly 11 digits long"),
  check("city").notEmpty().withMessage("City is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  submitCarValidationRules,
  validate,
};
