var express= require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require('path');

var mongoURI = 'mongodb://localhost:27017/assignments';
mongoose.connect(mongoURI);

var port = process.env.PORT || 3000;

var Mouse = require('../model/assignments.js');

app.use(bodyParser.json());

app.listen(port, function(){
  console.log('server up on:', port);
});


app.get('/', function(req, res){
  console.log('base url hit');
  Mouse.find({}, function(err, results){
    if (err) {
      console.log(err);
    }else{
      res.send(results);
    }
  });
});

app.post('/addAssignment', function(req, res){
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
