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
  console.log(data);
  res.send(data);  
};