const logger = require('../config/Logger/logger');
const Department = require('../models/Department');

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

exports.getAllDepartments = async (req, res) => {
  let response = { ...responseObj };
  try {
    let departments = await Department.find({});
    response.data = departments;
    response.message = 'Departments have been fetched successfully';
    res.json(response);
  } catch (err) {
    sendError({ message: err }, res);
  }
};

exports.getDepartmentById = async (req, res) => {
  let response = { ...responseObj };
  if (req.params.id) {
    try {
      let department = await Department.findById(req.params.id);
      response.data = department;
      response.message = 'Department has been fetched successfully';
      res.json(response);
    } catch (err) {
      sendError({ message: err }, res);
    }
  } else {
    sendError({ message: 'Department ID is required' }, res);
  }
};
