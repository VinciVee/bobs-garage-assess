// Bring in express
const express = require('express');
// Bring in the config file
const config = require('./config/config');
// Bring in the database models
const db = require('./models')

// Initiailise express app variable
const app = express();

// Destructure our models from the database
const { Product, User } = db.sequelize.models

// Test that .env is working
// require('dotenv').config();
// See if our .env variables have been loaded
// console.log(process.env);

// Initialise middleware
// This middleware allows the server to parse incomming requests with JSON data
app.use(express.json());
// This middleware allows the server to parse incomming requests with url-encoded data
app.use(express.urlencoded({ extended: true }));


// Routes can be get, post, put or delete
// These are our CRUD - CREATE, READ, UPDATE, DELETE

// Crete a route to handle '/'
app.get('/', (req, res) => {
  console.log('/ - get');
  res.send('Home Page');
});

// Create a test route
app.get('/test', (req, res) => {
  console.log('/test - get');
  res.status(200).send(' I am a server, and I am up!');
});

// Create routes for our flower shop - Products
// getting all the products
app.get('/api/products', (req, res) => {
  // log the path and request
  console.log('/api/products - GET');
  // Send response
  res.send('Get all Products, GET');
});
// Get a single flower
// Note: :id is for dynamic routes
app.get('/api/products/edit/:id', (req, res) => {
  // log the path and request
  console.log('/api/products/edit/:id - GET');
  // Send response
  res.send('Get a single Product by id, GET');
});
// updating a flower
app.put('/api/products/edit/:id', (req, res) => {
  // log the path and request
  console.log('/api/products/edit/:id - PUT');
  // Send response
  res.send('Update a product by id, PUT');
});
// deleting a flower
app.delete('/api/products/delete/:id', (req, res) => {
  // log the path and request
  console.log('/api/products/delete/:id - DELETE');
  // Send response
  res.send('Delete a Product, DELETE');
});

// Adding a flower
// path: /api/products/add
// name: add new product
// request: POST
// type: auth route
// Description: save a new product to the database using the Product model
app.post('/api/products/add', async (req, res) => {
  // log the path and request
  console.log('/api/products/add - POST');
  // Create a dummy product to add in
  // To save we need to use the Model.create method
  // This allows us to send the data to the database and save it in the products table
  // What we send needs to match our model
  const product = await Product.create({
    name: 'New flower name',
    desc: 'A new flower added to the database',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYoR2rpqdWmu6bsR0BZb6y2Lw2TaglVVB8TQ&s',
    price: 2.45
  })
  // The response from the database will be sorted in the product variable
  // Error or the record that was just added to the database.
  console.log(product.toJSON())

  // Send response
  res.send(product);
});

// Modify the Listen so we can sync with our database
// use the sync() method
// Purpose: will check if the tables exist - if they do not exist, then it will create them
// Note: be careful using the sync() method - a wrong setup could delete everything in the the database
db.sequelize.sync().then(() => {
  // Listen to the port
  app.listen(config.port,
    () => console.log(`Server is running on port: ${config.port}`)
  )
})

// We actually need to run MySQL database before we start the server
// Wamp / mamp / Xampp running with MySQL installed.
// Make sure that your username and password match what you need for the database
// Default:
