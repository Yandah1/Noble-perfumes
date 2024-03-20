const Order = require('../models/order');
const { OrderItem } = require('../models/order-item');
const { User } = require('../models/user');

exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      user,
      transactionId,
      status
    } = req.body;

    // Create new order items
    const createdOrderItems = await OrderItem.insertMany(orderItems);

    // Create the user object
    const { name, email } = user;
    const newUser = new User({ name, email, phone });
    const savedUser = await newUser.save();

    // Create the order
    const newOrder = new Order({
      orderItems: createdOrderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      user: savedUser._id,
      transactionId,
      status
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Internal Server Error');
  }
};