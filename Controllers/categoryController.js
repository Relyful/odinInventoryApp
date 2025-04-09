const pool = require("../db/pool");

exports.indexGet = async (req, res) => {
  const { rows } = await pool.query("SELECT cat_name FROM category");
  res.render("category", {
    categories: rows
  });
};

exports.categoryGet = async (req, res) => {
  const cat = req.params.category;
  const { rows } = await pool.query(
    "SELECT bikes.*, brands.brand_name, category.cat_name FROM bikes JOIN category on bikes.category_id = category.id JOIN brands on bikes.brand_id = brands.id WHERE category_id = (SELECT id FROM category WHERE category.cat_name = ($1))",
    [cat]
  );
  console.log(rows);
  res.render("viewCategory", {
    catName: cat,
    bikes: rows,
  });
};

exports.newCategoryGet = (req, res) => {
  res.render("createCategory");
};

exports.newCategoryPost = async (req, res) => {
  const data = req.body.catName;
  await pool.query("INSERT INTO category (cat_name) VALUES ($1)", [data]);
  res.redirect(`/category/${data}/bikes`);
};
