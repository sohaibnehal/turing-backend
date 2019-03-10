var Seeder = require('mongoose-data-seed').Seeder;
var Tax = require('../models/Tax');

var data = [
  {
    type: 'Sales Tax at 8.5%',
    percentage: 8.5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    type: 'No Tax',
    percentage: 0,
    created_at: new Date(),
    updated_at: new Date()
  }
];

var TaxSeeder = Seeder.extend({
  shouldRun: function() {
    return Tax.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Tax.create(data);
  }
});

module.exports = TaxSeeder;
