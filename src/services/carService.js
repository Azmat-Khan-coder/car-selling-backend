const Car = require("../models/carModel.js");

const submitCar = async (req, res) => {
  try {
    const { model, price, phone, city } = req.body;
    const userId = req.user.id;

    const car = new Car({ userId, model, price, phone, city });
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { submitCar };
