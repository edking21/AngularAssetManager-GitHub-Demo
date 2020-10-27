const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const AssetSchema = new Schema({
  assetName: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"],
  },
  assetCode: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"],
  },
  category: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"],
  },
  location: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  assetStatus: {
    type: String,
  },
});

AssetSchema.plugin(AutoIncrement, { inc_field: "id" });

// AssetSchema.pre('save', function(next) {
//   // This middleware will prevent `save()` from executing and go straight
//   // to executing the error handling middleware
//   next(new Error('pre save error'));
// });

// AssetSchema.post('save', function(doc, next) {
//   // If this hook is defined _before_ an error handler middleware, this will
//   // skip all other non-error-handler post save hooks and execute the next
//   // error handler middleware
//   next(new Error('post save error'));
// });

module.exports = mongoose.model("Asset", AssetSchema);
