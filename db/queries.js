const pool = require('./pool');

async function getCategoryNames() {
  const { rows } = await pool.query(`SELECT cat_name FROM category`);
  return rows;
};

async function getBrandNames() {
  const { rows } = await pool.query(`SELECT brand_name FROM brands`);
  return rows;
};

module.exports = {
  getCategoryNames,
  getBrandNames,
};