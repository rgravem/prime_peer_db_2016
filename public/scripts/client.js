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
          $('#searchResults').html('<h5>'+data[0].assignment_number+' '+data[0].student_name+' '+data[0].score+'</h5>');
        }

    });//ajax call
  });//search on click
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
