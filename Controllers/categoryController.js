exports.indexGet = (req, res) => {
  res.render('category', { categories: [
    {name: 'Hardtail'},
    {name: 'Road'},
    {name: 'Full suspension'}
  ]});
}

exports.categoryGet = (req, res) => {  
  const cat = req.params.category;
  console.log(cat);
  res.send(`Hello ${cat}`);
}