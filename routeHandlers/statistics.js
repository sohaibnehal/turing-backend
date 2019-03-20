const Product = require('../models/Product');

exports.getStats = async (req, res) => {
  let { type, collection } = req.params;
  if (type === 'count' && collection === 'products') {
    try {
      let count = Product.countDocuments({});
      res.status(200).json({
        count
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  }
};
