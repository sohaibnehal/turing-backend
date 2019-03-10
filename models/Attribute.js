const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const attributeSchema = new Schema({
  name: String,
  value: String,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
attributeSchema.pre('save', next => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;
