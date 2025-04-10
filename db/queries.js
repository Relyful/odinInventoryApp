const pool = require('./pool');

async function getCategoryNames() {
  const { rows } = await pool.query(`SELECT cat_name FROM category`);
  return rows;
};

async function getBrandNames() {
  const { rows } = await pool.query(`SELECT brand_name FROM brands`);
  return rows;
};

async function getAllBrandBikes(brand) {
  const { rows } = await pool.query("SELECT bikes.*, category.cat_name, brands.brand_name FROM bikes JOIN brands ON bikes.brand_id = brands.id JOIN category ON bikes.category_id = category.id WHERE brand_id = (SELECT id FROM brands WHERE brand_name = ($1))", [brand]);
  return rows;
};

async function postNewBrand(data) {
  await pool.query(`INSERT INTO brands (brand_name, country)
      VALUES ($1, $2)`, [data.brandName, data.brandCountry]);
      return;
};

module.exports = {
  getCategoryNames,
  getBrandNames,
  getAllBrandBikes,
  postNewBrand,
};