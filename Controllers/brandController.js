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
  res.render('viewBike', {
    action: brand,
    bikes: bikes
  });
});

exports.newBrandGet = (req, res) => {
  res.render('createBrand', {
    action: 'Create',
    brand: null,
  });
};

exports.newBrandPost = asyncHandler(async (req, res) => {
  const data = req.body;
  await db.postNewBrand(data);
  res.redirect('/brand');
});

exports.updateBrandGet = asyncHandler(async (req, res) => {
  const brandId = req.params.brandId;
  const brand = await db.getBrandFromId(brandId);
  if (!brand) {
    throw new Error("Brand not found!");
  }
  console.log(brand);  
  res.render('createBrand', {
    action: 'Update',
    brand,
  })
});

exports.updateBrandPost = asyncHandler(async (req, res) => {
  const brandId = req.params.brandId;
  const brandName = req.body.brandName;
  await pool.query(`UPDATE brands SET brand_name = $1
    WHERE id = $2`, [brandName, brandId]);
  res.redirect('/brand');
});

exports.deleteBrandGet = asyncHandler(async (req, res) => {
  const brandId = req.params.brandId;
  await pool.query('DELETE FROM brands WHERE id = $1', [brandId]);
  res.redirect('/brand');
})