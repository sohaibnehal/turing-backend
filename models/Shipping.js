const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const shippingSchema = new Schema({
  type: String,
  cost: Number,
  shippingRegionId: { type: Schema.Types.ObjectId, ref: 'ShippingRegion' },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
shippingSchema.pre('save', next => {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Shipping = mongoose.model('Shipping', shippingSchema);

module.exports = Shipping;
