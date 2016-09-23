// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var homeCtrl = angular.module('homeCtrl',[]);
homeCtrl.controller('homeCtrl', function($scope, $location, $http,$rootScope,$timeout){



     // Any function returning a promise object can be used to load values asynchronously
     $scope.getLocation = function(val) {
      return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        return response.data.results;
      });
    };

    $scope.onSelect = function ($item, $model, $label) {
      $scope.$item = $item;
      
    };

    $scope.goNext = function () {
      var latlong = $scope.$item.geometry.location.lng+","+$scope.$item.geometry.location.lat;
      var path = "/listing/"+latlong;
      $location.path(path);
    };
    
    
  });