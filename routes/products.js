const express = require('express');
const router = express.Router();
const products = require('../routeHandlers/products');

router.post('/', (req, res) => {
  products.getProductBySearchOrCategoryId(req, res);
});
router.get('/:id', (req, res) => {
  products.getProductById(req, res);
});

module.exports = router;
