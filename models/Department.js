const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const departmentSchema = new Schema({
  name: String,
  description: String,
  created_at: Date,
  updated_at: Date
});

// on every save, add the date
departmentSchema.pre('save', next => {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
