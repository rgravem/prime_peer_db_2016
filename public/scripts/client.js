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
});//docready

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
