const pool = require('../db/pool');

exports.indexGet = async (req, res) => {
  const { rows } = await pool.query("SELECT brand_name from brands"); //Apply rows to render
  res.render('brands', { 
    brands: rows,
  });
}

exports.brandGet = async (req, res) => {
  const brand = req.params.brand;
  const { rows } = await pool.query("SELECT bikes.*, category.cat_name, brands.brand_name FROM bikes JOIN brands ON bikes.brand_id = brands.id JOIN category ON bikes.category_id = category.id WHERE brand_id = (SELECT id FROM brands WHERE brand_name = ($1))", [brand]); // apply rows
  console.log(rows);
  res.render('viewBrand', {
    brandName: brand,
    bikes: rows
  });
};

exports.newBrandGet = (req, res) => {
  res.render('createBrand');
}

exports.newBrandPost = async (req, res) => {
  const data = req.body;
  await pool.query(`INSERT INTO brands (brand_name, country)
    VALUES ($1, $2)`, [data.brandName, data.brandCountry]);
  res.redirect('/brand');
};