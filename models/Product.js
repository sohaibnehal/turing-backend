const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const productSchema = new Schema({
  name: String,
  description: String,
  price: String,
  discounted_price: String,
  image: String,
  image_2: String,
  thumbnail: String,
  display: String,
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
productSchema.pre('save', next => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
