const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors'); 
const Product = require("./models/product");
const jwt = require('jsonwebtoken');
const path = require('path');
const errorHandler = require('./helpers/error-handler');
//const GuestCheckout = require('../models/guest-checkout');
//const protectedRoute = require('./routes/protected');
//const authenticateToken = require('./helpers/jwt');

// Create Express app
const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());

// Middleware Configuration
app.use(express.json()); // Parse JSON in the request body
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('tiny'));
//app.use('/api', protectedRoute);
app.use(errorHandler);
//app.use(authenticateToken); // Use authJwt middleware


//app.get('/protected', authenticateToken, (req, res) => {
  // Access the authenticated user information from req.user
 // const user = req.user;
  // Handle the protected route logic here
//});

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const guestCheckoutRoutes = require('./routes/guest-checkouts'); 


dotenv.config();

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/guest-checkouts`, guestCheckoutRoutes);

// Connect to MongoDB database
mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'noble-perfumes'
  })
  .then(() => {
    console.log('Database connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../frontend/out')));

  // Start the server
app.listen(port, ()=>{
    console.log('server is running http://localhost:3000');
})