const express = require('express');
const router = express.Router();
const statistics = require('../routeHandlers/statistics');

router.get('/:type/:collection', (req, res) => {
  statistics.getStats(req, res);
});

module.exports = router;
