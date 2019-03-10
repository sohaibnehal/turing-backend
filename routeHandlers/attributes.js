const logger = require('../config/Logger/logger');
const Attribute = require('../models/Attribute');

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

exports.getAllAttributes = async (req, res) => {
  let response = { ...responseObj };
  try {
    let attributes = await Attribute.find({});
    response.data = attributes;
    response.message = 'Attributes have been fetched successfully';
    res.json(response);
  } catch (err) {
    sendError({ message: err }, res);
  }
};
