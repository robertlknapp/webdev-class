const express = require('express');
const productsController = require('./controllers/products');

const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

//Important to have static at top and "catch-all" at the bottom
app.use('/', express.static('./client/dist')); //handles static requests, again be careful what files can be sent


//responds to get requests, repeatedly executed after pipeline is established for each request
//once a request has been handled, nothing below that could also apply to it gets executed, only the first

//Headers sent with every request
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //What origins can access
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); //What they can do
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //Allowed response headers
  next(); //next keyword calls next item in pipeline, passing control
});

app
  .get('/', (req, res) => {

    res.status(200).send('Happy Sweet New Year');

  }) //can chain functions because each function returns the express object again for next use
  .get('/error', (req, res) => {
    sessss.port();
  })
  .use('/api/v1/products', productsController)

//if we have a request that was handled by none of the previous -> probably client side, give index.html
app.get('*', (req,res) => {
  res.sendFile('index.html', {root: './client/dist'}); //can be security problem, need to be careful what files can be sent
});

//Error handling, think of like try catch
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.httpCode ?? 500).send({
    message: err.message ?? 'Houston we have a problem',
    status: err.httpCode ?? 500,
  }); //if httpcode for error exists, return that. Otherwise, generic 500 error
  //next(err) Error throwing done by putting err in next
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});