const logger = require('../config/Logger/logger');
const Category = require('../models/Category');

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

exports.getAllCategories = async (req, res) => {
  let response = { ...responseObj };
  try {
    let categories = await Category.find({});
    response.data = categories;
    response.message = 'Categories have been fetched successfully';
    res.json(response);
  } catch (err) {
    sendError({ message: err }, res);
  }
};

exports.getCategoryById = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let category = await Category.findById(req.params.id);
      response.data = category;
      response.message = 'Category has been fetched successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Category ID is required' }, res);
  }
};

exports.getCategoryByDepartmentId = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let category = await Category.find({ departmentId: req.params.id });
      response.data = category;
      response.message = 'Categories have been fetched successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Department ID is required' }, res);
  }
};
