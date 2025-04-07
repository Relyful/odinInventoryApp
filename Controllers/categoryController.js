exports.indexGet = async (req, res) => {
  const { rows } = await pool.query("SELECT name FROM category");
  res.render('category', { categories: [
    {name: 'Hardtail'},
    {name: 'Road'},
    {name: 'Full suspension'}
  ]});
}

exports.categoryGet = async (req, res) => {
  const cat = req.params.category;
  const { rows } = await pool.query("SELECT * FROM bikes WHERE category = (SELECT id FROM category WHERE name = $(1))", [cat])
  console.log(cat);
  res.render('viewCategory', { 
    catName: cat, 
    bikes: [
      {
        name: 'Zephyr Pro',
        speeds: 12,
        quantity: 420,
        price: 1337,
        brand: CTM,
        category: cat
      }
    ]
  });
}