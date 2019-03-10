const express = require('express');
const router = express.Router();
const taxes = require('../routeHandlers/taxes');

router.get('/', (req, res) => {
  taxes.getAllTaxesOptions(req, res);
});

module.exports = router;
