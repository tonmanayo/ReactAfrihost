const express = require('express');
const router = express.Router();              // using express router
import Product from './../models/product';

router.post('/', (req, res, next) => {
    return res.status(500).json({
        title: 'An error occurred',
        err: {message: 'post failed'}
    });
});

router.post('/post', (req, res, next) => {
    let product = new Product({
        createdAt: Date.now(),
        friendlyName: req.body.friendlyName,
        isPaused: req.body.isPaused,
        status: req.body.status,
        uid: req.body.uid,
        updatedAt: Date.now()
    });
    product.save((err, result) => {
        if (err){
            return res.status(500).json({
                title: 'error occurred',
                error: err
            })
        }
        res.status(201).json({
            title: 'product created',
            obj: result
        });
    })
});

router.get("/allPosts", (req, res, next) => {
    Product.find().then(products => {
        res.status(200).json({
            products: products
        })
    })
});


module.exports = router;