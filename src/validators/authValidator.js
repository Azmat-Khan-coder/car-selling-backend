const { check, validationResult } = require("express-validator");

const loginValidationRules = [
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  loginValidationRules,
  validate,
};
