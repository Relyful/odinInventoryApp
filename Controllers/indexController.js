const asyncHandler = require('express-async-handler');
const pool = require('../db/pool');
const db = require('../db/queries');

exports.indexGet = (req, res) => {
  res.render('index');
};

exports.newBikeGet = asyncHandler(async (req, res) => {
  const categories = await db.getCategoryNames();
  const brands = await db.getBrandNames();
  console.log(brands, categories);  
  res.render('createBike', { 
    brands: brands,
    categories: categories
   });
});

exports.newBikePost = asyncHandler(async (req, res) => {
  const data = req.body; 
  db.postNewBike(data);
  console.log(data);
  res.redirect('/');  
});