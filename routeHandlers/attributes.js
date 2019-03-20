const Attribute = require('../models/Attribute');

exports.getAllAttributes = async (req, res) => {
  try {
    let attributes = await Attribute.find({});
    res.status(200).json({
      message: 'Attributes have been fetched successfully',
      data: attributes
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
