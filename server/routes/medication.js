const express = require("express");
const router = express.Router();
const Medication = require('../models/medication');
const Student = require('../models/student');

router.put("/updateraw/:id",  function (req, res) {
  console.log('UpdateRaw id: ', req.params.id);
  console.log('req.body: ',req.body);
  
  Medication.findOneAndUpdate(req.params.id, req.body, function (err, updatedMedication) {
    if (err) {
      console.log(err.message);
      res.send(err);
    } else {
      console.log('updatedMedication: ', updatedMedication);
      res.send(updatedMedication);
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
  //rawResult: true,  // Using this will break medication edit - do not do it
  useFindAndModify: false,
  runValidators: true,
  upsert: true
};

// create uses id for filter
router.put("/medications", function (req, res) {
  let filter = { id: req.body.id };
  FindAndUpdate(req,filter,res);
});

// get the medication body first then update from req.body
router.put('/medications/:id', function (req, res) {
  var query = {
    id: req.params.id
  };
  Medication.findOne(query, function (err, foundMedication) {
    if (err) {
      res.status(422).send({
        errors: {
          title: "Medication Error !!!",
          detail: "Could not find Medication with ID"
        }
      });
    }
    let filter = { _id: foundMedication._id};
    FindAndUpdate(req,filter,res);
    // res.json(foundMedication._id);
    // res.json(query);
  });
});

// get the medication body first then update from req.body
router.get('/read-medication/:id', function (req, res) {
  var query = {
    id: req.params.id
  };
  Medication.findOne(query, function (err, foundMedication) {
    if (err) {
      res.status(422).send({
        errors: {
          title: "Medication Error !!!",
          detail: "Could not find Medication with ID"
        }
      });
    }
    let filter = { _id: foundMedication._id};
    FindAndUpdate(req,filter,res);
    // res.json(foundMedication._id);
    // res.json(query);
  });
});
function FindAndUpdate(req, filter, res) {
  return Medication.findOneAndUpdate (filter, req.body, options,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
}
router.put("/:id", function (req, res, next) {
  Medication.findOneAndUpdate( req.params.id, req.body , options,       
    function ( err, result ) {
      if (err) { res.send(err);
      } else { res.json(result); }
    });
});

// Insert one medication
router.get("/insertdata/id/:id/medicationName/:medicationName", function (req, res) {
  Medication.insertMany(
    [{
      id: req.params.id,
      medicationName: req.params.medicationName,
      medicationCode: "555",
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

router.post("/medication", function (req, res) {
  var medication = new Medication(req.body);
  medication.id = 2222;
  medication.medicationName ='newName';
  medication.category='newcat';
  medication.medicationCode='8888';
  console.log(medication);
  Medication.create(medication)
    .then(function (medicationFound) {
      res.json(medicationFound);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// create new medication and assign it to a student
router.post("/medication/:id", function (req, res) {
  Student.create(req.body)
    .then(function (Student) {
      return Medication.findOneAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          students: Student._id
        }
      }, {
        new: true
      });
    })
    .then(function (Medication) {
      res.json(Medication);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Get all medications
router.get('', (req, res, next) => {
  Medication.aggregate([{
    "$lookup": {
      from: "students",
      localField: "studentId",
      foreignField: "studentId",
      as: "student"
    }
  }]).exec(function (err, Medication) {
    // console.log(Medication[0]);
    if (err) res.json(err);
    else res.json(Medication);
  });
});

router.get('/medications', function (req, res) {
  Medication.find({})
    .then(function (Medication) {
      res.json(Medication);
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
  Medication.findOne({
      id: req.params.id
    })
    .populate("student")
    .then(function (dbMedication) {
      res.json(dbMedication);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// router.get('/:id', function(req, res){
//     const medicationId = req.params.id;
//     Medication.find({}, function(err, foundMedication) {
//         if(err)
//         {
//             res.status(422).send({ errors : [{title : "Medication Error !!!" , detail: "Could not find Medication with ID"}]});
//         }
//         res.json(foundMedication);
//     });
// });

module.exports = router;
