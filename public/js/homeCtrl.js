// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var homeCtrl = angular.module('homeCtrl',[]);
homeCtrl.controller('homeCtrl', function($scope, $http,$rootScope,$timeout){

   

     // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };
    
    
});