// payment.js

const express = require('express');
const router = express.Router();
const { generatePayFastUrl } = require('../helpers/payment-gateways'); // Import function to generate PayFast payment URL

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

module.exports = router;
