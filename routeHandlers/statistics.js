const logger = require('../config/Logger/logger');
const Product = require('../models/Product');

// Error handling
const sendError = (err, res) => {
  let response = { ...responseObj };
  response.status = 501;
  response.message = typeof err === 'object' ? err.message : err;
  res.status(501).json(response);
};

// Response handling
let responseObj = {
  status: 200,
  data: [],
  message: null
};

exports.getStats = async (req, res) => {
  let response = { ...responseObj };
  let { type, collection } = req.params;
  if (type === 'count' && collection === 'products') {
    Product.countDocuments({}, (err, count) => {
      if (err) sendError({ message: err }, res);
      response.count = count;
      res.json(response);
    });
  }
};
