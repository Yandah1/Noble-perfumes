const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors'); 
const Product = require("./models/product");
const jwt = require('jsonwebtoken');
const path = require('path');
const errorHandler = require('./helpers/error-handler');
const http = require('http');
const socketIO = require('socket.io');

// Create Express app
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server); 

app.use(cors());
app.options('*', cors());

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('tiny'));
app.use(errorHandler);

app.get('/api/data', (req, res) => {
  res.json({ data: 'Hello from Node.js backend!' });
});

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const guestCheckoutRoutes = require('./routes/guest-checkouts');
const paymentsRoutes = require('./routes/payments');
const orderTrackingRoutes = require('./routes/orderTracking');

dotenv.config();

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/guest-checkouts`, guestCheckoutRoutes);
app.use(`${api}/payments`, paymentsRoutes);
app.use(`${api}/orderTracking`, orderTrackingRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../frontend/out')));

// WebSocket connection
io.on('connection', (socket) => { // Corrected parameter name
  console.log('A new client connected');

  // Handle order status updates
  socket.on('orderStatusUpdate', (data) => {
    io.emit('orderStatusUpdate', data);
  });

  // Handle disconnection
  socket.on('disconnect', () =>  {
    console.log('A client disconnected');
  });
});

// Connect to MongoDB database
mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'noble-perfumes'
  })
  .then(() => {
    console.log('Database connection is ready...');
    // Start the server after successful database connection
    server.listen(port, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
