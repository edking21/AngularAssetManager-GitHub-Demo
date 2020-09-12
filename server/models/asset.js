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

module.exports = mongoose.model("Asset", AssetSchema);
