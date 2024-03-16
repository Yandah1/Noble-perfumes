const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');

router.get('/:trackingNumber', async (req, res) => {
    try {
      const { trackingNumber } = req.params;
  
      // Query the order model or database to get the order tracking information
      const order = await OrderModel.findOne({ trackingNumber });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Return the order tracking information
      res.json(order);
    } catch (error) {
      console.error('Error retrieving order tracking information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;