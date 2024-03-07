const express = require('express');
const router = express.Router();
//const guestCheckout = require('../models/guest-checkout');
const GuestCheckout = require('../models/guest-checkout');

// Create a guest checkout order
router.post('/', async (req, res) => {
    try {
        const { orderId, shippingAddress, contactDetails, paymentMethod } = req.body;
        const guestCheckout = new GuestCheckout({
            orderId,
            shippingAddress,
            contactDetails,
            paymentMethod
        });
        const savedGuestCheckout = await guestCheckout.save();
        res.status(201).json(savedGuestCheckout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all guest checkout orders
router.get('/', async (req, res) => {
    try {
        const guestCheckouts = await GuestCheckout.find();
        res.json(guestCheckouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single guest checkout order by orderId
router.get('/:orderId', async (req, res) => {
    try {
        const guestCheckout = await GuestCheckout.findOne({ orderId: req.params.orderId });
        if (!guestCheckout) {
            return res.status(404).json({ message: 'Guest checkout order not found' });
        }
        res.json(guestCheckout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a guest checkout order by orderId
router.put('/:orderId', async (req, res) => {
    try {
        const updatedGuestCheckout = await GuestCheckout.findOneAndUpdate(
            { orderId: req.params.orderId },
            req.body,
            { new: true }
        );
        if (!updatedGuestCheckout) {
            return res.status(404).json({ message: 'Guest checkout order not found' });
        }
        res.json(updatedGuestCheckout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a guest checkout order by orderId
router.delete('/:orderId', async (req, res) => {
    try {
        const deletedGuestCheckout = await GuestCheckout.findOneAndDelete({ orderId: req.params.orderId });
        if (!deletedGuestCheckout) {
            return res.status(404).json({ message: 'Guest checkout order not found' });
        }
        res.json({ message: 'Guest checkout order deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
