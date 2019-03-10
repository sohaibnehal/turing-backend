const express = require('express');
const router = express.Router();
const attributes = require('../routeHandlers/attributes');

router.get('/', (req, res) => {
  attributes.getAllAttributes(req, res);
});

module.exports = router;
