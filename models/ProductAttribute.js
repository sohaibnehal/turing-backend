const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const productAttributeSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  attributeId: { type: Schema.Types.ObjectId, ref: 'Attribute' },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
productAttributeSchema.pre('save', next => {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const ProductAttribute = mongoose.model(
  'ProductAttribute',
  productAttributeSchema
);

module.exports = ProductAttribute;
