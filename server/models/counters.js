var mongoose = require('mongoose'),
    Schema = mongoose.Schema

const CountersSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  sequence_value: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Counters", CountersSchema);
