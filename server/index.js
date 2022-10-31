const express = require('express');
const productsController = require('./controllers/products');

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

//responds to get requests
app
  .get('/', (req, res) => {

    res.status(200).send('Happy Sweet New Year');

  })
  .use('/api/v1/products', productsController)

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});