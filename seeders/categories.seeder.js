const mongoose = require('mongoose');
var Seeder = require('mongoose-data-seed').Seeder;
var Department = require('../models/Department');
var Category = require('../models/Category');

var data = [
  {
    name: 'French',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Italian',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Irish',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Animal',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Flower',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'Christmas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Valentine',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

var CategorySeeder = Seeder.extend({
  beforeRun: function() {
    var _this = this;

    return Department.find({})
      .exec()
      .then(function(departments) {
        _this.departments = departments;
        _this.categoriesData = _this._generateCategories();
      });
  },
  shouldRun: function() {
    return Category.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Category.create(this.categoriesData);
  },
  _generateCategories: function() {
    var categories = [];
    var _this = this;

    for (var i = 0; i < data.length; i++) {
      var index = _this._getRandomInt(0, this.departments.length - 1);
      var category = {
        name: data[i].name,
        description: data[i].description,
        departmentId: new mongoose.Types.ObjectId(this.departments[index]._id),
        created_at: new Date(),
        updated_at: new Date()
      };
      categories.push(category);
    }
    return categories;
  },
  _getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});

module.exports = CategorySeeder;
