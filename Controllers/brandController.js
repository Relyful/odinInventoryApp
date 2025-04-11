const pool = require('../db/pool');
const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

exports.indexGet = asyncHandler(async (req, res) => {
  const brandNames = await db.getBrandNames(); //Apply rows to render
  res.render('brands', { 
    brands: brandNames,
  });
});

exports.brandGet = asyncHandler(async (req, res) => {
  const brand = req.params.brand;
  const bikes = await db.getAllBrandBikes(brand);
  res.render('viewBrand', {
    brandName: brand,
    bikes: bikes
  });
});

exports.newBrandGet = (req, res) => {
  res.render('createBrand');
};

exports.newBrandPost = asyncHandler(async (req, res) => {
  const data = req.body;
  await db.postNewBrand(data);
  res.redirect('/brand');
});