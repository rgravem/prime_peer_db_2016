console.log('js sourced');
$(document).ready(function(){
  console.log('jq sourced');
  $("#addBtn").on('click',function(){
    var objectToSend= {
      assignment_number:$('#numberIn').val(),
      student_name:$('#nameIn').val(),
      student_score:$('#scoreIn').val()
    };//objectToSend
    console.log(objectToSend);
$.ajax({
    type:'POST',
    url:'/addAssignment',
    data:objectToSend,
    success:function(){
      console.log('success function');
      location.reload();

    }

});//ajax call
  });//addBtn onclick
  $('#searchBtn').on('click',function(){
    console.log('search button works');
    var objectToSend ={
      id:$('#searchIn').val()
    };
    $.ajax({
        type:'PUT',
        url:'/search',
        data:objectToSend,
        success:function(data){
          console.log('success function in the searchbutton click',data);
          $('#searchResults').html('<h3>Search Results:</h3>' + '<p>Assignment number: ' + data[0].assignment_number + '<br>Student name: ' + data[0].student_name + '<br>Score: ' +data[0].score+'</p>');
        }

    });//ajax call
  });//search on click
  var deleteButton = function(data){
    console.log('deletebutton clicked',data);
    };

  $('body').on('click', '.deleteButton', function(){
    var deleteMe = $(this).attr('data');
    console.log('delete clicked at:', deleteMe);
    deleteAssignment(deleteMe);
  });
});//docready

var deleteAssignment = function(selected){
  console.log('in delete assign', selected);
  var objectToSend = {
    assignment_number: selected
  };
  console.log('object to delete:', objectToSend);
  $.ajax({
    type: 'DELETE',
    url: '/delete',
    data: objectToSend,
    success: function(data){
      console.log('delete success');
    }
  });
};

var globalArray=[];
var myApp = angular.module('myApp',[]);
myApp.controller('assignments',['$scope','$http',function($scope,$http){
  console.log("NG working");
  $http({
    method:'GET',
    url:'/assignments',
  }).then(function(response){
  var array = response.data;
  console.log('this is the array:',array);
  $scope.dataToDom = array;
  });//then



}]);//myApp controller
