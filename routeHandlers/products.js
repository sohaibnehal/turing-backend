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

exports.getAllProducts = async (req, res) => {
  let response = { ...responseObj };
  try {
    let products = await Product.find({});
    response.data = products;
    res.json(response);
  } catch (err) {
    sendError({ message: err }, res);
  }
};

exports.getProductById = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let product = Product.findById(req.params.id);
      response.data = product;
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Product ID is required' }, res);
  }
};

exports.getProductByCategoryId = async (req, res) => {
  let response = { ...responseObj };
  const perPage = 5;
  const page = req.body.page && req.body.page > 0 ? parseInt(req.body.page) : 0;
  if (req.params.id) {
    try {
      let products = await Product.find({
        categoryId: req.params.id,
        name: { $regex: req.query.searchText, $options: 'i' }
      })
        .limit(perPage)
        .skip(perPage * page)
        .populate('categoryId')
        .exec();
      let count = await Product.countDocuments({
        name: { $regex: req.query.searchText, $options: 'i' }
      });
      response.data = products;
      response.total = count;
      response.currentPage = page;
      if ((page + 1) * perPage >= count) {
        response.nextPage = null;
      } else {
        response.nextPage = page + 1;
      }
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Category ID is required' }, res);
  }
};
