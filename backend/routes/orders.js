const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();


const orderSchema = mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }]
});

// GET order list
router.get('/', async (req, res) => {
  const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

// GET a specific order by its ID
router.get(`/:id`, async (req, res) =>{
  const order = await Order.findById(req.params.id)
  .populate('user', 'name')
  .populate({ 
      path: 'orderItems', populate: {
          path : 'product', populate: 'category'} 
      });

  if(!order) {
      res.status(500).json({success: false})
  } 
  res.send(order);
})

// CREATE a new order
router.post('/', async (req, res) => {
  const orderItemsIds = await Promise.all(req.body.orderItems.map(async (orderItem) => {
    let newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product
    });

    newOrderItem = await newOrderItem.save();

    return newOrderItem._id;
  }));

  let order = new Order({
    name: req.body.name,
    orderItems: orderItemsIds,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user
  });
  order = await order.save();

  if (!order)
    return res.status(400).send('The order cannot be created!');

  res.send(order);
});

// UPDATE an order by ID
router.put('/:id', async (req, res) => {
    const orderId = req.params.id;
    const updatedOrder = req.body;
  
    const updatedOrderItems = await Promise.all(updatedOrder.orderItems.map(async (orderItem) => {
      let updatedItem;
      if (mongoose.Types.ObjectId.isValid(orderItem._id)) {
        // Existing order item, update it
        updatedItem = await OrderItem.findByIdAndUpdate(orderItem._id, {
          quantity: orderItem.quantity,
          product: orderItem.product
        }, { new: true });
      } else {
        // New order item, create it
        const newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product
        });
        updatedItem = await newOrderItem.save();
      }
      return updatedItem._id;
    }));
  
    const updatedOrderData = {
      name: updatedOrder.name,
      orderItems: updatedOrderItems,
      shippingAddress1: updatedOrder.shippingAddress1,
      shippingAddress2: updatedOrder.shippingAddress2,
      city: updatedOrder.city,
      zip: updatedOrder.zip,
      country: updatedOrder.country,
      phone: updatedOrder.phone,
      status: updatedOrder.status,
      totalPrice: updatedOrder.totalPrice,
      user: updatedOrder.user
    };
  
    const updatedOrderResult = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
  
    if (!updatedOrderResult) {
      return res.status(400).send('The order cannot be updated!');
    }
  
    res.send(updatedOrderResult);
  });

  // UPDATE order status by ID
router.put('/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send('The order does not exist!');
    }

    // Emit the order status update event to connected clients
    io.emit('orderStatusUpdate', {
      orderId: updatedOrder._id,
      status: updatedOrder.status,
    });

    res.send(updatedOrder);
  } catch (error) {
    res.status(400).send('The order status could not be updated!');
  }
});

  // DELETE a order by its ID
  router.delete('/:id', async (req, res) => {
    const orderId = req.params.id;
  
    const deletedOrder = await Order.findByIdAndDelete(orderId);
  
    if (!deletedOrder) {
      return res.status(404).send('The order does not exist!');
    }
  
    // Remove associated order items
    await OrderItem.deleteMany({ _id: { $in: deletedOrder.orderItems } });
  
    res.status(200).json({ success: true, message: 'Order deleted successfully.' });
  });

  router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

// GET order count
router.get('/get/count', async (req, res) => {
    try {
      const orderCount = await Order.countDocuments();
  
      res.send({
        orderCount: orderCount
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

module.exports = router;