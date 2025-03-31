exports.indexGet = (req, res) => {
  res.send('Hello category');
}

exports.categoryGet = (req, res) => {  
  const cat = req.params.category;
  console.log(cat);
  res.send(`Hello ${cat}`);
}