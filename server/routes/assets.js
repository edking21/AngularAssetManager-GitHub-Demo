const express = require("express");
const router = express.Router();
const Asset = require('../models/asset');

router.get('', function(req, res){
    Asset.find({}, function( err , foundAssets) {
        res.json(foundAssets);
    });
});

router.get('/:id', function(req, res){
    const assetId = req.params.id;
    Asset.findById(assetId, function(err, foundAsset) {
        if(err)
        {
            res.status(422).send({ errors : [{title : "Asset Error !!!" , detail: "Could not find Asset with ID"}]});
        }
        res.json(foundAsset);
    });
})

module.exports = router;