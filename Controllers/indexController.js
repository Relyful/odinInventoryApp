const asyncHandler = require('express-async-handler');
const pool = require('../db/pool');
const db = require('../db/queries');

exports.indexGet = (req, res) => {
  res.render('index');
};

exports.newBikeGet = asyncHandler(async (req, res) => {
  const categories = await db.getCategoryNames();
  const brands = await db.getBrandNames();
  res.render('createBike', { 
    action: 'Create',
    brands: brands,
    categories: categories,
    bike: null,
    selectedBrand: null,
    selectedCategory: null,
   });
});

exports.newBikePost = asyncHandler(async (req, res) => {
  const data = req.body; 
  db.postNewBike(data);
  console.log(data);
  res.redirect('/');  
});

exports.updateBikeGet = asyncHandler(async (req, res) => {
  const bikeId = req.params.bikeId;
  const bike = await db.getBikeFromId(bikeId);
  const brands = await db.getBrandNames();
  const categories = await db.getCategoryNames();
  res.render('createBike', { 
    action: 'Update',
    brands: brands,
    categories: categories,
    bike, 
    selectedBrand: bike.brand_name,
    selectedCategory: bike.cat_name,
   });
});

exports.updateBikePost = asyncHandler(async (req, res) => {
  const bikeId = req.params.bikeId;
  const data = req.body;
  await db.postUpdateBike(data, bikeId);
  res.redirect('/');  
})