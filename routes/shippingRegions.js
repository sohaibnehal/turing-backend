const express = require('express');
const router = express.Router();
const shippingRegions = require('../routeHandlers/shippingRegions');

router.get('/', (req, res) => {
  shippingRegions.getAllShippingRegions(req, res);
});

module.exports = router;
