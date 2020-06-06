const express = require("express");
const router = express.Router();
const Student = require('../models/student');

router.get('', function(req, res){
    Student.find({}, function( err , foundEmployees) {
        res.json(foundEmployees);
    });
});

router.get('/:id', function(req, res){
    const studentId = req.params.id;
    Student.findById(studentId, function(err, foundEmployee) {
        if(err)
        {
            res.status(422).send({ errors : [{title : "Student Error !!!" , detail: "Could not find Student with ID"}]});
        }
        res.json(foundEmployee);
    });
})

module.exports = router;