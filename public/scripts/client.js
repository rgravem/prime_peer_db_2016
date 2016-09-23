console.log('js sourced');
var globalArray=[];
var myApp = angular.module('myApp',[]);
myApp.controller('assignments',['$scope','$http',function($scope,$http){
  console.log("NG working");
  $http({
    method:'GET',
    url:'/assignments',
  }).then(function(response){
    console.log('this came back from server',response.data);
  var array = response.data;
  console.log('this is the array:',array);
  $scope.dataToDom = array;
  console.log('$scope.dataToDom',$scope.dataToDom);
  });//then



}]);//myApp controller
