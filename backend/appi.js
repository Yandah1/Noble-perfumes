const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const authJwt = require('./helpers/jwt');

//const Product = require('./models/product');

// Load environment variables
dotenv.config();

//pp.use(cors());
//app.options('*', cors())


// Create Express app
const app = express();
const port = 3000;

// Middleware Configuration
app.use(express.json()); // Parse JSON in the request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('tiny')); // Logging middleware
app.use(authJwt());

// Routes
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
//const ordersRouter = require('./routers/orders');

const api = process.env.API_URL;

// Mount routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
//app.use(`${api}/orders`, ordersRouter);


// Connect to MongoDB database
mongoose.connect(process.env.CONNECT_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'noble-perfumes'
  .then(() => {
    console.log('Database connection is ready...');
  })
  .catch((err) => {
    console.log(err);
  })
});
// Start the server
app.listen(port, () => {
  console.log(api);
  console.log(`Server is running on port ${port}`);
});