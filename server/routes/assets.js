const express = require("express");
const router = express.Router();
const Asset = require('../models/asset');
const Student = require('../models/student');

router.put("/updateraw/:id",  function (req, res) {
  console.log('UpdateRaw id: ', req.params.id);
  console.log('req.body: ',req.body);
  
  Asset.findOneAndUpdate(req.params.id, req.body, function (err, updatedAsset) {
    if (err) {
      console.log(err.message);
      res.send(err);
    } else {
      console.log('updatedAsset: ', updatedAsset);
      res.send(updatedAsset);
    }
  });
});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  var d = new Date();
  console.log('Time: ', d.toLocaleString());
  next();
});

router.use(express.json()); // for parsing application/json
// router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let options = {
  new: true,
  //rawResult: true,  // Using this will break asset edit
  useFindAndModify: false,
  runValidators: true,
  upsert: true
};

// create a new asset from the req.body
router.put("/assets", function (req, res) {
  var query = {
    id: req.body.id
  };
  FindAndUpdate(req, query, res);
});

// get the asset body first then update from req.body
router.put('/assets/:id', function (req, res) {
  var query = {
    id: req.params.id
  };
  Asset.findOne(query, function (err, foundAsset) {
    if (err) {
      res.status(422).send({
        errors: {
          title: "Asset Error !!!",
          detail: "Could not find Asset with ID"
        }
      });
    }
    FindAndUpdate(req,foundAsset._id,res);
    // res.json(foundAsset._id);
    // res.json(query);
  });
});

// get the asset body first then update from req.body
router.get('/read-asset/:id', function (req, res) {
  var query = {
    id: req.params.id
  };
  Asset.findOne(query, function (err, foundAsset) {
    if (err) {
      res.status(422).send({
        errors: {
          title: "Asset Error !!!",
          detail: "Could not find Asset with ID"
        }
      });
    }
    FindAndUpdate(req,query,res);
    // res.json(foundAsset._id);
    // res.json(query);
  });
});
function FindAndUpdate(req, id, res) {
  return Asset.findOneAndUpdate(+id, req.body, options,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
}
router.put("/:id", function (req, res, next) {
  Asset.findOneAndUpdate( req.params.id, req.body , options,       
    function ( err, result ) {
      if (err) { res.send(err);
      } else { res.json(result); }
    });
});

// Insert one asset
router.get("/insertdata/id/:id/assetName/:assetName", function (req, res) {
  Asset.insertMany(
    [{
      id: req.params.id,
      assetName: req.params.assetName,
      assetCode: "555",
      category: "computer"
    }],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/asset", function (req, res) {
  var asset = new Asset(req.body);
  asset.id = 2222;
  asset.assetName ='newName';
  asset.category='newcat';
  asset.assetCode='8888';
  console.log(asset);
  Asset.create(asset)
    .then(function (assetFound) {
      res.json(assetFound);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// create new asset and assign it to a student
router.post("/asset/:id", function (req, res) {
  Student.create(req.body)
    .then(function (Student) {
      return Asset.findOneAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          students: Student._id
        }
      }, {
        new: true
      });
    })
    .then(function (Asset) {
      res.json(Asset);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Get all assets
router.get('', (req, res, next) => {
  Asset.aggregate([{
    "$lookup": {
      from: "students",
      localField: "studentId",
      foreignField: "studentId",
      as: "student"
    }
  }]).exec(function (err, Asset) {
    // console.log(Asset[0]);
    if (err) res.json(err);
    else res.json(Asset);
  });
});

router.get('/assets', function (req, res) {
  Asset.find({})
    .then(function (Asset) {
      res.json(Asset);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get('/students', function (req, res) {
  Student.find({})
    .then(function (Student) {
      res.json(Student);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get('/:id/edit/test', function (req, res) {
  Asset.findOne({
      id: req.params.id
    })
    .populate("student")
    .then(function (dbAsset) {
      res.json(dbAsset);
    })
    .catch(function (err) {
      res.json(err);
    });
});

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

module.exports = router;
