// payment.js

const express = require('express');
const router = express.Router();
const { generatePayFastUrl } = require('../helpers/payment-gateways'); // Import function to generate PayFast payment URL

// POST Endpoint for Initial Payment Processing
router.post('/payfast', async (req, res) => {
    try {
        // Process the initial payment data
i        // Generate PayFast payment URL
        const orderId = '1234'; // Get orderId from request or generate dynamically
        const amount = '10.00'; // Get payment amount from request
        const payFastUrl = generatePayFastUrl(orderId, amount);

        // Respond with PayFast payment URL
        res.status(200).json({ payFastUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

        // Insert or update payment information into your database
        await PaymentModel.create({
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

        // Respond to the payment gateway with a success message
        res.status(200).send('Payment notification received and database updated');
    } catch (error) {
        console.error('Error processing payment notification:', error);
        res.status(500).send('Internal server error');
    }
});


module.exports = router;
