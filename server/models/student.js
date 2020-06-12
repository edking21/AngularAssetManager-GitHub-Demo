const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let StudentSchema = new Schema({
  student_name: {
    type: String,
    required: true
  },
  student: {
    type: String,
    required: true

  },
  student_email: {
    type: String
  },
  section: {
    type: String
  },
  subjects: {
    type: Array
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  },
  studentId: {
    type: Number
  }
}
);

module.exports = mongoose.model('Student', StudentSchema);