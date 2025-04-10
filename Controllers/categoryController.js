const pool = require("../db/pool");
const db = require('../db/queries');

exports.indexGet = async (req, res) => {
  const categories = await db.getCategoryNames();
  res.render("category", {
    categories
  });
};

exports.categoryGet = async (req, res) => {
  const cat = req.params.category;
  const bikes = await db.getAllCategoryBikes(cat);
  res.render("viewCategory", {
    catName: cat,
    bikes,
  });
};

exports.newCategoryGet = (req, res) => {
  res.render("createCategory");
};

exports.newCategoryPost = async (req, res) => {
  const data = req.body.catName;
  await db.postNewCategory(data);
  res.redirect(`/category`);
};
