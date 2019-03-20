const Product = require('../models/Product');
const ProductAttribute = require('../models/ProductAttribute');

exports.getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    res.status(200).json({
      message: 'Products have been fetched successfully',
      data: products
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

exports.getProductById = async (req, res) => {
  if (req.params.id) {
    try {
      let product = await Product.findById(req.params.id).lean();
      let attributes = await ProductAttribute.find({
        productId: req.params.id
      })
        .populate('attributeId')
        .exec();
      const attr = {
        Size: [],
        Color: []
      };
      attributes.forEach(item => {
        if (item.attributeId.name === 'Color') {
          attr['Color'].push(item.attributeId);
        }
        if (item.attributeId.name === 'Size') {
          attr['Size'].push(item.attributeId);
        }
      });
      product.attributes = attr;
      res.status(200).json({
        message: 'Product attributes have been fetched successfully',
        data: product
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
exports.getProductBySearchOrCategoryId = async (req, res) => {
  const response = {};
  const perPage = 10;
  const page = req.body.page && req.body.page > 1 ? parseInt(req.body.page) : 1;
  let query = {
    name: { $regex: req.query.searchText, $options: 'i' }
  };
  if (req.query.categoryId) {
    query['categoryId'] = req.query.categoryId;
  }
  try {
    let products = await Product.find(query)
      .limit(perPage)
      .skip(perPage * (page - 1))
      .populate('categoryId')
      .exec();
    let count = await Product.countDocuments(query);
    response.data = products;
    response.total = count;
    response.currentPage = page;
    if ((page + 1) * perPage >= count) {
      response.nextPage = null;
    } else {
      response.nextPage = page + 1;
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};
