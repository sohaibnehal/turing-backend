const logger = require('../config/Logger/logger');
const Shipping = require('../models/Shipping');

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

exports.getAllShippingOptions = async (req, res) => {
  let response = { ...responseObj };
  Shipping.find({}, (err, shippingOptions) => {
    if (err) sendError({ message: err }, res);

    response.data = shippingOptions;
    res.json(response);
  });
};
