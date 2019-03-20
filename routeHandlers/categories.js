const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find({})
      .populate('departmentId')
      .exec();
    res.status(200).json({
      message: 'Categories have been fetched successfully',
      data: categories
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

exports.getCategoryById = async (req, res) => {
  if (req.params.id) {
    try {
      let category = await Category.findById(req.params.id);
      res.status(200).json({
        message: 'Category has been fetched successfully',
        data: category
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'Category ID is required'
    });
  }
};

exports.getCategoryByDepartmentId = async (req, res) => {
  if (req.params.id) {
    try {
      let category = await Category.find({ departmentId: req.params.id });
      res.status(200).json({
        message: 'Category has been fetched successfully',
        data: category
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
