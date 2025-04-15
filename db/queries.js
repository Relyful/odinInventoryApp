const pool = require('./pool');

async function getCategoryNames() {
  const { rows } = await pool.query(`SELECT * FROM category ORDER BY id`);
  return rows;
};

async function getBrandNames() {
  const { rows } = await pool.query(`SELECT * FROM brands ORDER BY id`);
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

async function getAllCategoryBikes(category) {
  const { rows } = await pool.query(
    `SELECT bikes.*, brands.brand_name, category.cat_name 
    FROM bikes 
    JOIN category on bikes.category_id = category.id 
    JOIN brands on bikes.brand_id = brands.id 
    WHERE category_id = (SELECT id FROM category WHERE category.cat_name = ($1))`,
    [category]
  );
  return rows;
};

async function postNewCategory(data) {
  await pool.query("INSERT INTO category (cat_name) VALUES ($1)", [data]);
  return;
};

async function postNewBike(data){
  await pool.query(`INSERT INTO bikes (bike_name, speeds, quantity, price, brand_id, category_id) 
    VALUES ($1, $2, $3 ,$4, (SELECT id FROM brands WHERE brand_name = $5), (SELECT id FROM category WHERE cat_name = $6))`, 
    [data.bikeName, data.bikeSpeeds, data.bikeQuantity, data.bikePrice, data.bikeBrand, data.bikeCategory]);
};

async function getCategoryFromId(id) {
  const { rows } = await pool.query(`SELECT * FROM category WHERE id = $1`, [id]);
  return rows[0];
};

async function getBrandFromId(id) {
  const { rows } = await pool.query(`SELECT * FROM brands WHERE id = $1`, [id]);
  return rows[0];
};

async function getBikeFromId(id) {
  const { rows } = await pool.query(`SELECT bikes.*, brands.brand_name, category.cat_name
    FROM bikes JOIN brands ON bikes.brand_id = brands.id
    JOIN category ON bikes.category_id = category.id
    WHERE bikes.id = $1`, [id]);
    return rows[0];
};

async function postUpdateBike(data, bikeId) {
  await pool.query(`UPDATE bikes SET bike_name = $1, speeds = $2, quantity = $3, price = $4, brand_id = (SELECT id FROM brands WHERE brand_name = $5), category_id = (SELECT id FROM category WHERE cat_name = $6)
    WHERE id = $7`, [data.bikeName, data.bikeSpeeds, data.bikeQuantity, data.bikePrice, data.bikeBrand, data.bikeCategory, bikeId]);
};

async function getAllBikes() {
  const { rows } = await pool.query(`SELECT bikes.*, brands.brand_name, category.cat_name 
    FROM bikes 
    JOIN category on bikes.category_id = category.id 
    JOIN brands on bikes.brand_id = brands.id`);
  return rows;
}

module.exports = {
  getCategoryNames,
  getBrandNames,
  getAllBrandBikes,
  postNewBrand,
  getAllCategoryBikes,
  postNewCategory,
  postNewBike,
  getCategoryFromId,
  getBrandFromId,
  getBikeFromId,
  postUpdateBike,
  getAllBikes,
};