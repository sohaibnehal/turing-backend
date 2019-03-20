const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const taxSchema = new Schema({
  type: String,
  percentage: Number,
  shippingRegionId: { type: Schema.Types.ObjectId, ref: 'ShippingRegion' },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
taxSchema.pre('save', next => {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
