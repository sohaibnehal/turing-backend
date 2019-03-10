const mongoose = require('mongoose');
var Seeder = require('mongoose-data-seed').Seeder;
var Product = require('../models/Product');
var Category = require('../models/Category');
var products = require('./products');

var ProductSeeder = Seeder.extend({
  beforeRun: function() {
    var _this = this;

    return Category.find({})
      .exec()
      .then(function(categories) {
        _this.categories = categories;
        _this.productsData = _this._generateProductsData();
      });
  },
  shouldRun: function() {
    return Product.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Product.create(this.productsData);
  },
  _generateProductsData: function() {
    var productsData = [];
    var _this = this;
    for (var i = 0; i < products.length; i++) {
      var index = _this._getRandomInt(0, this.categories.length - 1);
      var productItem = {
        name: products[i].name,
        description: products[i].description,
        price: products[i].price,
        discounted_price: products[i].discounted_price,
        image: products[i].image,
        image_2: products[i].image_2,
        thumbnail: products[i].thumbnail,
        display: products[i].display,
        categoryId: new mongoose.Types.ObjectId(this.categories[index]._id),
        created_at: new Date(),
        updated_at: new Date()
      };
      productsData.push(productItem);
    }
    return productsData;
  },
  _getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});

module.exports = ProductSeeder;
