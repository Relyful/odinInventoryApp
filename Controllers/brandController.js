const pool = require('../db/pool');
const db = require('../db/queries');

exports.indexGet = async (req, res) => {
  const brandNames = await db.getBrandNames(); //Apply rows to render
  res.render('brands', { 
    brands: brandNames,
  });
};

exports.brandGet = async (req, res) => {
  const brand = req.params.brand;
  const bikes = await db.getAllBrandBikes(brand);
  res.render('viewBrand', {
    brandName: brand,
    bikes: bikes
  });
};

exports.newBrandGet = (req, res) => {
  res.render('createBrand');
};

exports.newBrandPost = async (req, res) => {
  const data = req.body;
  await db.postNewBrand(data);
  res.redirect('/brand');
};