const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  department: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: 'Department',
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);