const mongoose = require('mongoose');
var Seeder = require('mongoose-data-seed').Seeder;
var ProductAttribute = require('../models/ProductAttribute');
var Product = require('../models/Product');
var Attribute = require('../models/Attribute');

var ProductAttributeSeeder = Seeder.extend({
  beforeRun: function() {
    var _this = this;

    return Attribute.find({})
      .exec()
      .then(function(attributes) {
        _this.attributes = attributes;
        return Product.find({})
          .exec()
          .then(function(products) {
            _this.products = products;
            _this.productAttributeData = _this._generateData();
          });
      });
  },
  shouldRun: function() {
    return ProductAttribute.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return ProductAttribute.create(this.productAttributeData);
  },
  _generateData: function() {
    var data = [];
    this.products.forEach(product => {
      this.attributes.forEach(attribute => {
        var item = {
          productId: new mongoose.Types.ObjectId(product._id),
          attributeId: new mongoose.Types.ObjectId(attribute._id)
        };
        data.push(item);
      });
    });
    return data;
  }
});

module.exports = ProductAttributeSeeder;
