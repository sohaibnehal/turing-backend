const mongoose = require('mongoose');
var Seeder = require('mongoose-data-seed').Seeder;
var Attribute = require('../models/Attribute');

var attributes = [
  {
    name: 'Size',
    value: 'S'
  },
  {
    name: 'Size',
    value: 'M'
  },
  {
    name: 'Size',
    value: 'L'
  },
  {
    name: 'Size',
    value: 'XL'
  },
  {
    name: 'Size',
    value: 'XXL'
  },
  {
    name: 'Color',
    value: 'Red'
  },
  {
    name: 'Color',
    value: 'Blue'
  },
  {
    name: 'Color',
    value: 'Green'
  },
  {
    name: 'Color',
    value: 'Indigo'
  },
  {
    name: 'Color',
    value: 'Yellow'
  },
  {
    name: 'Color',
    value: 'Purple'
  }
];

var AttributesSeeder = Seeder.extend({
  shouldRun: function() {
    return Attribute.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Attribute.create(attributes);
  }
});

module.exports = AttributesSeeder;
