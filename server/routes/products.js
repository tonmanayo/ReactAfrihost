const express = require('express');
const router = express.Router();              // using express router
import Product from './../models/product';

router.post('/', (req, res, next) => {
    return res.status(500).json({
        title: 'An error occurred',
        err: {message: 'post failed'}
    });
});

router.post('/add', (req, res, next) => {
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
    Product.find((err, products) => {
        if (err) {
            return res.status(500).json({
                title: 'error occurred, could not get all products',
                error: err
            })
        }
        return res.status(201).json({
            title: 'Products found',
            products: products
        });
    });
});

router.get('/delete/:id', (req, res, next) => {
    Product.findByIdAndRemove({_id: req.params.id }, (err, product) => {
        if(err) {
            return res.status(500).json({
              title: "error, could not delete",
              error: err
            })
        }
        return res.status(201).json({
            title: 'Successfully Deleted Product',
            products: product
        });
    });
});

router.post('/update/:id', (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            return res.status(500).json({
                title: "error, could not delete",
                error: err
        })}

        if(!product) {
            return res.status(404).json({
               title: "Product not found",
               error: err
            })
        }
        else {
            item.item = req.body.product;
            item.save().then(item => {
               return res.json('Update complete');
            })
                .catch((err) => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

module.exports = router;