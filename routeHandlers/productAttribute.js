const ProductAttribute = require('../models/ProductAttribute');

exports.getAllAttributesByProductId = async (req, res) => {
  if (req.params.id) {
    try {
      let data = await ProductAttribute.find({
        productId: req.params.id
      })
        .populate('attributeId')
        .exec();
      const attributes = { Size: [], Color: [] };
      if (data.length) {
        data.forEach(item => {
          if (item.attributeId.name === 'Size') {
            attributes.Size.push(item.attributeId.value);
          }
          if (item.attributeId.name === 'Color') {
            attributes.Color.push(item.attributeId.value);
          }
        });
      }
      res.status(200).json({
        message: 'Products Attributes have been fetched successfully',
        data: attributes
      });
    } catch (err) {
      res.status(404).json({
        message: err
      });
    }
  } else {
    res.status(400).json({
      message: 'Product ID is required'
    });
  }
};
