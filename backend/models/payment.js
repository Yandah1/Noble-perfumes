const mongoose = require('mongoose');

// Define the schema for the Payment model
const paymentSchema = new mongoose.Schema({
    m_payment_id: {
        type: String,
        required: true,
    },
    pf_payment_id: {
        type: String,
        require : true,
    },
    payment_status: String,
    amount_gross: Number,
    amount_fee: Number,
    amount_net: Number,
    name_first: String,
    name_last: String,
    email_address: String,
    signature: String
});

// Create the Payment model using the schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
