const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const customerSchema = new Schema({
  name: String,
  email: String,
  password: String,
  credit_card: String,
  address_1: String,
  address_2: String,
  city: String,
  region: String,
  postal_code: String,
  country: String,
  shippingRegionId: { type: Schema.Types.ObjectId, ref: 'ShippingRegion' },
  phone: String,
  mobile: String
});

// on every save, add the date
customerSchema.pre('save', next => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
