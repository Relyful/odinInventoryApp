const pool = require('../db/pool');

exports.indexGet = (req, res) => {
  res.render('index');
};

exports.newBikeGet = async (req, res) => {
  const categoriesQ = await pool.query(`SELECT cat_name FROM category`);
  const brandsQ = await pool.query(`SELECT brand_name FROM brands`);
  const brands = brandsQ.rows;
  const categories = categoriesQ.rows;
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