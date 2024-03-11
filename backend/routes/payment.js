// payment.js

const express = require('express');
const router = express.Router();
const { generatePayFastUrl } = require('../helpers/paymentGateways'); // Import function to generate PayFast payment URL

// POST Endpoint for Initial Payment Processing
router.post('/payfast', async (req, res) => {
    try {
        // Process the initial payment data
        // Generate PayFast payment URL
        const orderId = '1234'; // Get orderId from request or generate dynamically
        const amount = '10.00'; // Get payment amount from request
        const payFastUrl = generatePayFastUrl(orderId, amount);

        // Respond with PayFast payment URL
        res.status(200).json({ payFastUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Define additional payment routes as needed
// payment.js
// Endpoint to handle payment notifications/callbacks
router.post('/notify',  res) => { 
	console.log(req.body);
    // Extract parameters from the request body
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

    // Verify signature (if required)
    // Perform necessary processing based on payment status
    // Update your database with payment information
    
    // Respond to the payment gateway with a success message
    res.status(200).send('Payment notification received');
});

module.exports = router;
