const express = require('express');
const mongoose  = require('mongoose');
const config = require('./config/dev');
const Asset = require('./models/asset');
const FakeDb = require('./fake-db-Asset');

const assetRoutes = require('./routes/assets');

mongoose.connect(config.DB_URI , { 
    useNewUrlParser : true ,
    useUnifiedTopology: true
})
//     .then(() => {
//     const fakeDb = new FakeDb();
//     fakeDb.seedDb();
// })
;

const app = express();

app.use("/api/v1/assets", assetRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log("Node Server is Running Assets on port 3001");
});