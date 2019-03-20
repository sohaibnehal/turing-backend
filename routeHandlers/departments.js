const Department = require('../models/Department');

exports.getAllDepartments = async (req, res) => {
  try {
    let departments = await Department.find({});
    res.status(200).json({
      message: 'Departments have been fetched successfully',
      data: departments
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  if (req.params.id) {
    try {
      let department = await Department.findById(req.params.id);
      res.status(200).json({
        message: 'Department has been fetched successfully',
        data: department
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'Department ID is required'
    });
  }
};
