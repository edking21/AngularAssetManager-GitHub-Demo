const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicationSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  studentId: {
    type: Number
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  medicationName: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"]
  },
  medicationCode: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"]
  },
  category: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"]
  },
  location: {
    type: String
  },
  imageUrl: {
    type: String
  },
  make: {
    type: String
  },
  model: {
    type: String
  },
  tags: {
    type: String
  },
  description: {
    type: String
  },
  medicationStatus: {
    type: String
  }
});

module.exports = mongoose.model("Medication", MedicationSchema);
