const express = require("express");
const router = express.Router();
const Asset = require('../models/asset');
const Student = require('../models/student');

router.get("/id/:id/assetName/:assetName", function(req, res ) {
  console.log('req.params: ', req.params);
  res.send(req.params.id + req.params.assetName);
});

router.get("/insertdata2/id/:id/assetName/:assetName", function(req, res ) {
  Asset.insertMany(
    [
      { id: req.params.id, assetName: req.params.assetName, assetCode: "555", category: "computer"}
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post("/asset", function(req, res) {
  Asset.create(req.body)
    .then(function(Asset) {
      res.json(Asset);
    })
    .catch(function(err) {
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

router.get('/:id/edit/info', function (req, res) {
  const assetId = req.params.id;
  var query = {
    id: assetId
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
    res.json(foundAsset);
  });
});

module.exports = router;
