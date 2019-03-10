const express = require('express');
const router = express.Router();
const products = require('../routeHandlers/products');

router.get('/', (req, res) => {
  products.getAllProducts(req, res);
});
router.get('/:id', (req, res) => {
  products.getProductById(req, res);
});
router.post('/category/:id', (req, res) => {
  products.getProductByCategoryId(req, res);
});

module.exports = router;
