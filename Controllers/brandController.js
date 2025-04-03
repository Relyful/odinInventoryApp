exports.indexGet = (req, res) => {
  res.render('brands', { brands: [
    {name: 'CTM'},
    {name: 'Canyon'},
    {name: 'Commencal'}
  ] });
}

exports.brandGet = (req, res) => {
  const brand = req.params.brand;
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