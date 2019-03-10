const express = require('express');
const router = express.Router();
const shipping = require('../routeHandlers/shipping');

router.get('/', (req, res) => {
  shipping.getAllShippingOptions(req, res);
});

module.exports = router;
