const express = require('express');
const mongoose = require('mongoose');
const { Product } = require('../models/product');
const router = express.Router();
const { Category } = require('../models/category');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })

// GET all products
router.get('/', async (req, res) => {
    try {
        const productList = await Product.find().populate('category');
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE a new product
router.post('/', async (req, res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    
    product = await product.save();
    
    if(!product)
    return res.status(500).send('The product cannot be created')

    res.send(product)
})


// UPDATE a product by ID
router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
     }

    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    let product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
    
    })


// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndRemove(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})


router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

router.post('/notify', (req, res) => {
    // Extract parameters from the request body
    console.log('Payment notification received:', req.body)
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

    //res.send('OK');

    // Verify signature (if required)
    // Perform necessary processing based on payment status
    // Update your database with payment information
    
    // Respond to the payment gateway with a success message
    res.status(200).send('Payment notification received');
});


module.exports = router;
