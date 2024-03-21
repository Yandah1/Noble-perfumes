const express = require('express');
const router = express.Router();
const { generatePayFastUrl } = require('../helpers/payment-gateways'); // Import function to generate PayFast payment URL
const Payment = require('../models/payment');
const  Order = require('../models/order'); //recreated
const { sendConfirmationEmail } = require('../helpers/email');
const { generateTrackingNumber } = require('../helpers/trackingHelpers');
const { v4: uuidv4 } = require('uuid');

// POST Endpoint for Initial Payment Processing
router.post('/payfast', async (req, res) => {
    try {
        // Process the initial payment data
        // Generate PayFast payment URL
        const orderId = '1234'; // Get orderId from request or generate dynamically
        const amount = '10.00'; // Get payment amount from request
        const payFastUrl = generatePayFastUrl(orderId, amount);

        // Respond with PayFast payment URL
        res.status(200).json({ orderId, payFastUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/notify', async (req, res) => {
    try {
      // Access parameters or query parameters as needed
      const { orderId } = req.query;
  
      // Perform necessary operations with the provided data
  
      res.status(200).json({ message: 'Notification received' });
    } catch (error) {
      console.error('Error processing notification:', error);
      res.status(500).json({ error: 'Failed to process notification' });
    }
  });
  router.post('/notify', async (req, res) => {
    try {
      // Extract parameters from the request body
      console.log('Payment notification received:', req.body);
      const {
        m_payment_id,
        pf_payment_id,
        payment_status,
        amount_gross,
        amount_fee,
        amount_net,
        name_first,
        name_last,
        email_address,
        signature
      } = req.body;
  
      // Insert or update payment information to the database
      await Payment.create({
        m_payment_id,
        pf_payment_id,
        payment_status,
        amount_gross,
        amount_fee,
        amount_net,
        name_first,
        name_last,
        email_address,
        signature
      });
  
      // Perform necessary operations with the provided data
      if (payment_status === 'completed') {
        // Update the order status to "paid" in your database
        //await Order.updateOne(
          //{ orderId: m_payment_id },
         // { $set: { status: 'paid' } }
       // );
        await Order.updateOne(
          { _id: orderId },
          { $set: { status: 'paid', trackingNumber: trackingNumber } }
        );
    
        // Generate a tracking number for the order
        const trackingNumber = generateTrackingNumber();
  
        // Associate the tracking number with the payment or order
        await Order.updateOne(
          { orderId: m_payment_id },
          { $set: { trackingNumber: trackingNumber } }
        );
  
        // Send a notification to the customer
        await sendNotificationToCustomer(email_address, 'Your payment is successful. Your tracking number is ' + trackingNumber);
      }
  
      // Send confirmation email to the buyer
      if (email_address) {
        await sendConfirmationEmail(email_address);
      }
  
      // Respond to the payment gateway with a success message
      res.status(200).send('Payment notification received and database updated');
    } catch (error) {
      console.error('Error processing payment notification:', error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;
