const express = require('express');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Ayo');
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}, enjoy! ;)`);
});