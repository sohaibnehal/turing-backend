var mongooseLib = require('mongoose');

var departments = require('./seeders/departments.seeder');
var categories = require('./seeders/categories.seeder');
var attribute = require('./seeders/attribute.seeder');
var shippingRegion = require('./seeders/shipping-region.seeder');
var shipping = require('./seeders/shipping.seeder');
var tax = require('./seeders/tax.seeder');
var products = require('./seeders/products.seeder');
var productAttribute = require('./seeders/product-attribute.seeder');

mongooseLib.Promise = global.Promise || Promise;

module.exports = {
  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/amazingstore',

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    Departments: departments,
    Categories: categories,
    Attributes: attribute,
    ShippingRegions: shippingRegion,
    Shippings: shipping,
    Taxes: tax,
    Products: products,
    ProductAttributes: productAttribute
  }
};
