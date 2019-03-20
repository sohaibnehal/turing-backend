const Shipping = require('../models/Shipping');

exports.getAllShippingOptions = async (req, res) => {
  try {
    let shippingOptions = await Shipping.find({})
      .populate('shippingRegionId')
      .exec();
    res.status(200).json({
      message: 'Shipping Options have been fetched successfully',
      data: shippingOptions
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
exports.getAllShippingOptionsByRegions = async (req, res) => {
  try {
    let shippingOptions = await Shipping.find({})
      .lean()
      .populate('shippingRegionId')
      .exec();
    let data = {};
    shippingOptions.forEach(item => {
      if (data[item.shippingRegionId.region]) {
        data[item.shippingRegionId.region].push(item);
      } else {
        data[item.shippingRegionId.region] = [];
        data[item.shippingRegionId.region].push(item);
      }
    });
    res.status(200).json({
      message: 'Shipping Options have been fetched successfully',
      data
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
