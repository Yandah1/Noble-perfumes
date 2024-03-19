const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const authenticateToken = require('../helpers/jwt');

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const userList = await User.find().select('-passwordHash');
        res.send(userList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Fetch a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({ message: 'The user with the given ID was not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        });

        user = await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).send('The user with the given ID was not found.');
        }

        res.send(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE user by specific ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            return res.status(200).json({ success: true, message: 'the user is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: "user not found!" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
});

// GET a number of users
router.get(`/get/count`, async (req, res) =>{
    try {
        const userCount = await User.countDocuments((count) => count);
        res.send({ userCount: userCount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;