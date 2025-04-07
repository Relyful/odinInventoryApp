exports.indexGet = async (req, res) => {
  const rows = await pool.query("SELECT name from brands"); //Apply rows to render
  res.render('brands', { brands: [
    {name: 'CTM'},
    {name: 'Canyon'},
    {name: 'Commencal'}
  ] });
}

exports.brandGet = async (req, res) => {
  const brand = req.params.brand;
  const { rows } = await pool.query("SELECT * FROM bikes WHERE brand_id = (SELECT id FROM brands WHERE name = ($1))", [brand]); // apply rows
  res.render('viewBrand', {
    brandName: brand,
    bikes: [
      {
        name: 'Zephyr Pro',
        speeds: 12,
        quantity: 420,
        price: 1337,
        brand: brand,
        category: 'Hardtail'
      }
    ]
  });
}