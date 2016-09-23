var express = require('express');
var router = express.Router(); // instead of var app = express

var mongoose = require('mongoose');

var Mouse = require('../model/assignments.js');

router.get('/', function(req, res){
  console.log('base url hit');
  Mouse.find({}, function(err, results){
    if (err) {
      console.log(err);
    }else{
      res.send(results);
    }
  });
});

router.post('/addAssignment', function(req, res){
  console.log('hit addAssignment post');

  var sentAssignment = req.body;

  var newAssignment = new Mouse({
    assignment_number: sentAssignment.assignment_number,
    student_name: sentAssignment.student_name,
    score: sentAssignment.score,
    date_completed: sentAssignment.date_completed
  });

  newAssignment.save(function(err){
    if(err){
    console.log(err);
    res.sendStatus(500);
    }else{
      console.log('successfully created assignment');
      res.sendStatus(200);
  }
  });
});

module.exports = router;
