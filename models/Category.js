const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const categorySchema = new Schema({
  name: String,
  description: String,
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
categorySchema.pre('save', next => {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
