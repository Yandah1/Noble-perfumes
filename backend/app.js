const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors'); 
const Product = require("./models/product");
//const authJwt = require('./helpers/jwt');

// Create Express app
const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());

// Middleware Configuration
app.use(express.json()); // Parse JSON in the request body
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('tiny'));
//app.use(authJwt()); // Use authJwt middleware

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
//const ordersRoutes = require('./routes/orders');

dotenv.config();

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
//app.use(`${api}/orders`, ordersRoutes);

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

  // Start the server
app.listen(port, ()=>{
    console.log('server is running http://localhost:3000');
})