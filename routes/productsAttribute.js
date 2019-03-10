const express = require('express');
const router = express.Router();
const productAttribute = require('../routeHandlers/productAttribute');

router.get('/product/:id', (req, res) => {
  productAttribute.getAllAttributesByProductId(req, res);
});

module.exports = router;
