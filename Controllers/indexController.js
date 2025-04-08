exports.indexGet = (req, res) => {
  res.render('index');
};

exports.newBikeGet = (req, res) => {
  res.render('createBike', { 
    brands: [
      {name: 'ctm'},
      {name: 'canyon'}
    ],
    categories: [
      {name: 'hardtail'},
      {name: 'full suspension'}
    ]
   });
};

exports.newBikePost = (req, res) => {
  const data = req.body; 
  //"INSERT INTO bikes (name, speeds, quantity, price, brand, category) VALUES ($1, $2, $3 ,$4, $5, $6)"
  console.log(data);
  res.send(data);  
};