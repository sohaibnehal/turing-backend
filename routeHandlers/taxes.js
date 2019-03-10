const logger = require('../config/Logger/logger');
const Tax = require('../models/Tax');

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

exports.getAllTaxesOptions = async (req, res) => {
  let response = { ...responseObj };
  Tax.find({}, (err, taxOptions) => {
    if (err) sendError({ message: err }, res);

    response.data = taxOptions;
    res.json(response);
  });
};
