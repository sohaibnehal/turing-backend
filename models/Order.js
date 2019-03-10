const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  totalAmount: String,
  shippedOn: Date,
  status: String,
  comments: String,
  shippingId: { type: Schema.Types.ObjectId, ref: 'Shipping' },
  items: Array
});

// on every save, add the date
orderSchema.pre('save', next => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
