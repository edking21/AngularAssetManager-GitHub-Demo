const express = require("express");
const router = express.Router();
const Asset = require('../models/asset');
const Employee = require('../models/employee');

router.get('', (req, res, next) => {
  Asset.aggregate([{
      "$lookup": {
        "from": "Employee",
        "let": {
          "employeeId": {
            "$toObjectId": "$employeeId"
          }
        },
        "pipeline": [{
          "$match": {
            "$expr": {
              "$eq": ["$_id", "$$employeeId"]
            }
          }
        }],
        "as": "assetEmployee"
      }
    }
    // ,
    // {"$unwind": "$assetEmployee" },
    // {
    //   "$group": {
    //     "_id": null,
    //     "allTags": {
    //       "$addToSet": "$assetEmployee"
    //     },
    //     "count": {"$sum": 1}
    //   }
    // }
  ]).exec(function (err, Asset) {
    console.log(Asset[0]);
    if (err) res.json(err);
    else res.json(Asset[0]);
  });
//   ], (err, Asset) => {
//     if (err) res.json(err);
//     else res.json(Asset);
//   });
// });
});

router.get('hold', function (req, res) {
  Asset.find({}, function (err, foundAssets) {
    res.json(foundAssets);
  });
});

// router.get('/:id', function(req, res){
//     const assetId = req.params.id;
//     Asset.find ({},  
//         {  
//             projection: { _id: 0, name: 1, address: 1 } 
//         }
//     ).toArray (function(err, result) 
//         {
//             if(err) throw err;
//             console.log(result);
//         }
//     );
// });
// router.get('/:id', function(req, res){
//     const assetId = req.params.id;
//     Asset.find({}, function(err, foundAsset) {
//         if(err)
//         {
//             res.status(422).send({ errors : [{title : "Asset Error !!!" , detail: "Could not find Asset with ID"}]});
//         }
//         res.json(foundAsset);
//     });
// });

// router.get('/:id', function(req, res){
//     const assetId = req.params.id;
//     Asset.findById(assetId, function(err, foundAsset) {
//         if(err)
//         {
//             res.status(422).send({ errors : [{title : "Asset Error !!!" , detail: "Could not find Asset with ID"}]});
//         }
//         res.json(foundAsset);
//     });
// });

module.exports = router;
