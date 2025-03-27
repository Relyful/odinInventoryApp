const express = require('express');
const indexRouter = require('./Routes/indexRouter');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public"); // TODO: search info on how exactly it works
app.use(express.static(assetsPath));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}, enjoy! ;)`);
});