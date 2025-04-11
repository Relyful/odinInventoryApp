const express = require('express');
const indexRouter = require('./Routes/indexRouter');
const brandRouter = require('./Routes/brandRouter');
const categoryRouter = require('./Routes/categoryRouter');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, "Views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "Public"); // TODO: search info on how exactly it works
app.use(express.static(assetsPath));

app.use('/', indexRouter);
app.use('/brand', brandRouter);
app.use('/category', categoryRouter);

//Error middleware
app.use((err, req, res, next) => {
  console.error(error);
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}, enjoy! ;)`);
});