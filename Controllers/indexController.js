const pool = require('../db/pool');
const db = require('../db/queries');

exports.indexGet = (req, res) => {
  res.render('index');
};

exports.newBikeGet = async (req, res) => {
  const categories = await db.getCategoryNames();
  const brands = await db.getBrandNames();
  console.log(brands, categories);  
  res.render('createBike', { 
    brands: brands,
    categories: categories
   });
};

exports.newBikePost = (req, res) => {
  const data = req.body; 
  //"INSERT INTO bikes (name, speeds, quantity, price, brand, category) VALUES ($1, $2, $3 ,$4, $5, $6)"
  console.log(data);
  res.send(data);  
};