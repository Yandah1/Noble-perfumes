const https = require('https');
const fs = require('fs');
const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors'); 
const Product = require("./models/product");
const jwt = require('jsonwebtoken');
const path = require('path');
const errorHandler = require('./helpers/error-handler');

// Create Express app
const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('tiny'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const paymentsRoutes = require('./routes/payments');
const orderTrackingRoutes = require('./routes/orderTracking');

dotenv.config();

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/payments`, paymentsRoutes);
app.use(`${api}/orderTracking`, orderTrackingRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../frontend/out')));

// Connect to MongoDB database
mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'noble-perfumes'
  })
  .then(() => {
    console.log('Database connection is ready...');
    // Start the server after successful database connection
    const options = {
      key: fs.readFileSync('/etc//etc/letsencrypt/live/backend.nobleperfumes.store-0001/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/backend.nobleperfumes.store-0001/fullchain.pem'),
    };

    const server = https.createServer(options, app);
    server.listen(port, () => {
      console.log('Server is running on https://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
