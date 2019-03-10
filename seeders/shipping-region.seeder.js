var Seeder = require('mongoose-data-seed').Seeder;
var ShippingRegion = require('../models/ShippingRegion');

var data = [
  {
    region: 'US/Canada',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    region: 'Rest of the World',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    region: 'Europe',
    created_at: new Date(),
    updated_at: new Date()
  }
];

var ShippingRegionSeeder = Seeder.extend({
  shouldRun: function() {
    return ShippingRegion.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return ShippingRegion.create(data);
  }
});

module.exports = ShippingRegionSeeder;
