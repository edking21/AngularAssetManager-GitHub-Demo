const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
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
  assetName: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"]
  },
  assetCode: {
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
  tags: [{
    type: String
  }],
  description: {
    type: String
  },
  assetStatus: {
    type: String
  }
});

module.exports = mongoose.model("Asset", AssetSchema);
