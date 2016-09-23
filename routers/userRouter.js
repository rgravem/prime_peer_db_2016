var express = require('express');
var router = express.Router(); // instead of var app = express

var mongoose = require('mongoose');

var Mouse = require('../model/assignments.js');
router.get('/:id?', function(req, res){
  console.log('base url hit');
  console.log('req.params',req.params);
  Mouse.find({}, function(err, results){
    if (err) {
      console.log(err);
    }else{
      res.send(results);
    }
  });
});



module.exports = router;
