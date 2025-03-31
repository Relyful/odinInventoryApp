exports.indexGet = (req, res) => {
  res.send('Hello Brand');
}

exports.brandGet = (req, res) => {
  const brand = req.params.brand;
  res.send(`Hello ${brand}`);
}