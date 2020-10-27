const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const bodyParser = require("body-parser");
const FakeDbAsset = require('./fake-db-Asset');

const assetRoutes = require("./routes/assets");

mongoose.connect(config.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// Uncomment the next 4 lines to reseed the asset database
    .then(() => {
    const fakeDb = new FakeDbAsset();
    fakeDb.seedDb();
})
;
mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);

const app = express();

app.use("/api/v1/assets", assetRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
  console.log("Node Server is Running Assets on port " + PORT);
});
