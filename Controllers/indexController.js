const asyncHandler = require("express-async-handler");
const pool = require("../db/pool");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const bikeValidation = [
  body("bikeName")
    .trim()
    .notEmpty()
    .isAscii()
    .withMessage("Bike name must contain valid ASCII characters."),
  body("bikeSpeeds")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Must be a number."),
  body("bikeQuantity")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Must be a number."),
  body("bikePrice")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Must be a number."),
  body("bikeBrand")
    .trim()
    .notEmpty()
    .isAscii()
    .withMessage("Bike name must contain valid ASCII characters."),
  body("bikeCategory")
    .trim()
    .notEmpty()
    .isAscii()
    .withMessage("Bike name must contain valid ASCII characters."),
];

exports.indexGet = (req, res) => {
  res.render("index");
};

exports.newBikeGet = asyncHandler(async (req, res) => {
  const categories = await db.getCategoryNames();
  const brands = await db.getBrandNames();
  res.render("createBike", {
    action: "Create",
    brands: brands,
    categories: categories,
    bike: null,
    selectedBrand: null,
    selectedCategory: null,
  });
});

exports.newBikePost = [
  bikeValidation,
  asyncHandler(async (req, res) => {
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
      return;
    }
    await db.postNewBike(data);
    console.log(data);
    res.redirect("/allBikes");
  }),
];

exports.updateBikeGet = asyncHandler(async (req, res) => {
  const bikeId = req.params.bikeId;
  const bike = await db.getBikeFromId(bikeId);
  const brands = await db.getBrandNames();
  const categories = await db.getCategoryNames();
  res.render("createBike", {
    action: "Update",
    brands: brands,
    categories: categories,
    bike,
    selectedBrand: bike.brand_name,
    selectedCategory: bike.cat_name,
  });
});

exports.updateBikePost = [
  bikeValidation,
  asyncHandler(async (req, res) => {
    const bikeId = req.params.bikeId;
    const data = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors);
      return;
    }
    await db.postUpdateBike(data, bikeId);
    res.redirect("/allBikes");
  }),
];

exports.allBikesGet = asyncHandler(async (req, res) => {
  const bikes = await db.getAllBikes();
  res.render("viewBike", {
    action: "All",
    bikes,
  });
});

exports.deleteBikeGet = asyncHandler(async (req, res) => {
  const bikeId = req.params.bikeId;
  await db.deleteBikeFromId(bikeId);
  res.redirect("/allBikes");
});
