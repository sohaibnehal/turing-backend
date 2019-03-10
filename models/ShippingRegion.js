const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const shippingRegionSchema = new Schema({
  region: String,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
shippingRegionSchema.pre('save', next => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;
  next();
});

const ShippingRegion = mongoose.model('ShippingRegion', shippingRegionSchema);

module.exports = ShippingRegion;
