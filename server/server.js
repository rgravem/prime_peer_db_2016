var express= require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require('path');

var mongoURI = 'mongodb://localhost:27017/assignments';
mongoose.connect(mongoURI);

var Mouse = require('../model/assignments.js');
var port = process.env.PORT || 3000;

// var Mouse = require('../model/assignments.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(port, function(){
  console.log('server up on:', port);
});
app.get('/',function(req, res){
  console.log(">>>>newest base url hit<<<<<<<");
  res.sendFile(path.resolve('public/index.html'));
});//app.get
app.put('/search', function (req,res) {
  var query= req.body;
  console.log(req.body);
  Mouse.find({assignment_number:req.body.id}, function(err, results){
    if (err) {
      console.log(err);
    }else{
      res.send(results);
    }
  });
});

app.delete('/delete', function( req, res){
  console.log('delete post:', req.body);
  Mouse.findByIdAndRemove({"assignment_number":req.body.assignment_number}, function(){
    console.log('delete attempted', req.body.assignment_number);
    res.send(200);
  });

});
app.post('/addAssignment', function(req, res){
  console.log('hit addAssignment post',req.body);

  var sentAssignment = req.body;

  var newAssignment = new Mouse({
    assignment_number: sentAssignment.assignment_number,
    student_name: sentAssignment.student_name,
    score: sentAssignment.student_score,
    date_completed: sentAssignment.date_completed
  });

  newAssignment.save(function(err){
    if(err){
    console.log('this is the error message _________________>>>>',err);
    res.sendStatus(500);
    }else{
      console.log('successfully created assignment');
      res.sendStatus(200);
  }
  });
});
var userRouter = require('../routers/userRouter');

// use routers
app.use('/assignments', userRouter);

app.get('/test/:id?', function(req, res){
  console.log('in test route');

  console.log('req.body =', req.body);
  console.log('req.query =', req.query); // localhost:3000/test?q=
  console.log('req.params =', req. params); // localhost:300/test/id

  res.send('ok');
});
app.use( express.static( 'public' ) );
