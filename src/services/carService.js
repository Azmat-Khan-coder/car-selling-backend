const Car = require("../models/carModel.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const submitCar = async (req, res) => {
  try {
    const { model, price, phone, city, images } = req.body;
    const userId = req.user.id;

    const imageUrls = [];
    for (const file of images) {
      const cloudinaryResponse = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });

      if (cloudinaryResponse.error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Internal server error during image upload",
          error: cloudinaryResponse.error.message,
        });
      }

      imageUrls.push(cloudinaryResponse.secure_url);
    }

    const car = new Car({
      userId,
      model,
      price,
      phone,
      city,
      images: imageUrls,
    });
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { submitCar };
