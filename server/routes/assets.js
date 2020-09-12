const express = require("express");
const router = express.Router();
const Asset = require("../models/asset");

router.put("/updateraw/:id", function (req, res) {
  console.log("UpdateRaw id: ", req.params.id);
  console.log("req.body: ", req.body);

  Asset.findOneAndUpdate(req.params.id, req.body, function (err, updatedAsset) {
    if (err) {
      console.log(err.message);
      res.send(err);
    } else {
      console.log("updatedAsset: ", updatedAsset);
      res.send(updatedAsset);
    }
  });
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  var d = new Date();
  console.log("Time: ", d.toLocaleString());
  next();
});

router.use(express.json()); // for parsing application/json

let options = {
  new: true,
  useFindAndModify: false,
  runValidators: true,
  upsert: true,
};

router.put("/create", function (req, res) {
  Asset.create({
    assetName: "Apple iPhone",
    assetCode: "1Ab123",
    category: "computer",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.get("/assets", function (req, res) {
  Asset.find({})
    .then(function (Asset) {
      res.json(Asset);
    })
    .catch(function (err) {
      res.status(404).send(err);
    });
});

// get the asset body first then update from req.body
router.put("/assets/:id", function (req, res) {
  var query = {
    id: req.params.id,
  };
  Asset.findOne(query, function (err, foundAsset) {
    if (err) {
      res.status(422).send({
        errors: {
          title: "Asset Error !!!",
          detail: "Could not find Asset with ID",
        },
      });
    }
    let filter = { _id: foundAsset._id };
    FindAndUpdate(req, filter, res);
  });
});

// get the asset body first then update from req.body
router.get("/read-asset/:id", function (req, res) {
  var query = {
    id: req.params.id,
  };
  Asset.findOne(query, function (err, foundAsset) {
    if (err) {
      res.status(422).send({
        errors: {
          title: "Asset Error !!!",
          detail: "Could not find Asset with ID",
        },
      });
    }
    let filter = { _id: foundAsset._id };
    FindAndUpdate(req, filter, res);
  });
});

function FindAndUpdate(req, filter, res) {
  return Asset.findOneAndUpdate(filter, req.body, options, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
}
router.put("/:id", function (req, res, next) {
  Asset.findOneAndUpdate(req.params.id, req.body, options, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// create new asset and assign it to a student
router.post("/asset/:id", function (req, res) {
  Student.create(req.body)
    .then(function (Student) {
      return Asset.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            students: Student._id,
          },
        },
        {
          new: true,
        }
      );
    })
    .then(function (Asset) {
      res.json(Asset);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Get all assets
router.get("", (req, res, next) => {
  Asset.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "studentId",
        foreignField: "studentId",
        as: "student",
      },
    },
  ]).exec(function (err, Asset) {
    // console.log(Asset[0]);
    if (err) res.json(err);
    else res.json(Asset);
  });
});

router.get("/:id/edit/test", function (req, res) {
  Asset.findOne({
    id: req.params.id,
  })
    .populate("student")
    .then(function (dbAsset) {
      res.json(dbAsset);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
