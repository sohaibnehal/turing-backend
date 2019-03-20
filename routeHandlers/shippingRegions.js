const ShippingRegion = require('../models/ShippingRegion');

exports.getAllShippingRegions = async (req, res) => {
  try {
    let shippingRegions = await ShippingRegion.find({}).exec();
    res.status(200).json({
      message: 'DepaShipping Regions have been fetched successfully',
      data: shippingRegions
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
