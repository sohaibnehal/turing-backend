const Tax = require('../models/Tax');

exports.getAllTaxesOptions = async (req, res) => {
  try {
    let taxes = await Tax.find({});
    res.status(200).json({
      message: 'Taxes options have been fetched successfully',
      data: taxes
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
