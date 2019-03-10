const mongoose = require('mongoose');
var Seeder = require('mongoose-data-seed').Seeder;
var ShippingRegion = require('../models/ShippingRegion');
var Shipping = require('../models/Shipping');

var set1 = [
  {
    type: 'Next Day Delivery ($20)',
    cost: 20
  },
  {
    type: '3-4 Days ($10)',
    cost: 10
  },
  {
    type: '7 Days ($5)',
    cost: 5
  }
];
var set2 = [
  {
    type: 'By air (10 days, $35)',
    cost: 35
  },
  {
    type: 'By sea (28 days, $30)',
    cost: 30
  }
];
var set3 = [
  {
    type: 'By air (7 days, $25)',
    cost: 25
  },
  {
    type: 'By sea (28 days, $10)',
    cost: 10
  }
];

var ShippingSeeder = Seeder.extend({
  beforeRun: function() {
    var _this = this;

    return ShippingRegion.find({})
      .exec()
      .then(function(shippingRegions) {
        _this.shippingRegions = shippingRegions;
        _this.shippingData = _this._generateShippingData();
      });
  },
  shouldRun: function() {
    return Shipping.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Shipping.create(this.shippingData);
  },
  _generateShippingData: function() {
    var shipping = [];
    var _this = this;

    for (var i = 0; i < set1.length; i++) {
      var shippingItem = {
        type: set1[i].type,
        cost: set1[i].cost,
        shippingRegionId: new mongoose.Types.ObjectId(
          this.shippingRegions[0]._id
        ),
        created_at: new Date(),
        updated_at: new Date()
      };
      shipping.push(shippingItem);
    }
    for (var i = 0; i < set2.length; i++) {
      var shippingItem = {
        type: set2[i].type,
        cost: set2[i].cost,
        shippingRegionId: new mongoose.Types.ObjectId(
          this.shippingRegions[1]._id
        ),
        created_at: new Date(),
        updated_at: new Date()
      };
      shipping.push(shippingItem);
    }
    for (var i = 0; i < set3.length; i++) {
      var shippingItem = {
        type: set3[i].type,
        cost: set3[i].cost,
        shippingRegionId: new mongoose.Types.ObjectId(
          this.shippingRegions[2]._id
        ),
        created_at: new Date(),
        updated_at: new Date()
      };
      shipping.push(shippingItem);
    }
    return shipping;
  }
});

module.exports = ShippingSeeder;
