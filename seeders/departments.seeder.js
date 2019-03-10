var Seeder = require('mongoose-data-seed').Seeder;
var Department = require('../models/Department');

var data = [
  {
    name: 'Regional',
    description:
      'Proud of your country? Wear a T-shirt with a national symbol stamp!',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Nature',
    description:
      'Find beautiful T-shirts with animals and flowers in our Nature department!',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Seasonal',
    description:
      'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.',
    created_at: new Date(),
    updated_at: new Date()
  }
];

var DepartmentsSeeder = Seeder.extend({
  shouldRun: function() {
    return Department.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Department.create(data);
  }
});

module.exports = DepartmentsSeeder;
