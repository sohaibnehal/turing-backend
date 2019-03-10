const logger = require('../config/Logger/logger');
const ProductAttribute = require('../models/ProductAttribute');

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

exports.getAllAttributesByProductId = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let data = await ProductAttribute.find({
        productId: req.params.id
      })
        .populate('attributeId')
        .exec();
      const attributes = { Size: [], Color: [] };
      if (data.length) {
        data.forEach(item => {
          if (item.attributeId.name === 'Size') {
            attributes.Size.push(item.attributeId.value);
          }
          if (item.attributeId.name === 'Color') {
            attributes.Color.push(item.attributeId.value);
          }
        });
      }
      response.data = attributes;
      response.message = 'Products Attributes have been fetched successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Product ID is required' }, res);
  }
};
