const pool = require("../db/pool");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const categoryValidation = [
  body("catName")
    .trim()
    .notEmpty()
    .withMessage("Cannot be Empty.")
    .isAscii()
    .withMessage("Cannot contain special characters."),
];

exports.indexGet = asyncHandler(async (req, res) => {
  const categories = await db.getCategoryNames();
  res.render("category", {
    categories,
  });
});

exports.categoryGet = asyncHandler(async (req, res) => {
  const cat = req.params.category;
  const bikes = await db.getAllCategoryBikes(cat);
  res.render("viewBike", {
    action: cat,
    bikes,
  });
});

exports.newCategoryGet = (req, res) => {
  res.render("createCategory", {
    action: "Create",
    defVal: "",
  });
};

exports.newCategoryPost = [
  categoryValidation,
  asyncHandler(async (req, res) => {
    const categoryName = req.body.catName;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("createCategory", {
        errors: errors.array(),
        action: "Create",
        defVal: categoryName,
      });
      return;
    }
    await db.postNewCategory(categoryName);
    res.redirect(`/category`);
  }),
];

exports.updateCategoryGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.catId;
  const category = await db.getCategoryFromId(categoryId);
  if (!category) {
    throw new Error("Category does not exist!");
  }
  res.render("createCategory", {
    action: "Update",
    defVal: category.cat_name,
  });
});

exports.updateCategoryPost = [
  categoryValidation,
  asyncHandler(async (req, res) => {
    const categoryId = req.params.catId;
    const categoryName = req.body.catName;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("createCategory", {
        errors: errors.array(),
        action: "Create",
        defVal: categoryName
      });
      return;
    }
    await pool.query(
      `UPDATE category
    SET cat_name = $2
    WHERE id = $1`,
      [categoryId, categoryName]
    );
    res.redirect("/category");
  })
];

exports.deleteCategoryGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  await pool.query("DELETE FROM category WHERE id = $1", [categoryId]);
  res.redirect("/category");
});
