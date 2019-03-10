const express = require('express');
const router = express.Router();

const departments = require('./departments');
const categories = require('./categories');
const products = require('./products');
const shipping = require('./shipping');
const tax = require('./tax');
const productsAttribute = require('./productsAttribute');
const statistics = require('./statistics');
const orders = require('./orders');
const attributes = require('./attributes');

router.use('/departments', departments);
router.use('/categories', categories);
router.use('/products', products);
router.use('/shipping', shipping);
router.use('/tax', tax);
router.use('/productsattribute', productsAttribute);
router.use('/stats', statistics);
router.use('/orders', orders);
router.use('/attributes', attributes);

module.exports = router;
