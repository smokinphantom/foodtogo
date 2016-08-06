// Creates the listCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var listCtrl = angular.module('listCtrl', ['geolocation','gservice']);
listCtrl.controller('listCtrl', function($scope, $http,$rootScope,$timeout, gservice,geolocation){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;
    // Refresh the map with new data
    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
    // Functions
    // ----------------------------------------------------------------------------
    // 
    // // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

    // Run the gservice functions associated with identifying coordinates
    //$timeout(function(){
    //any code in here will automatically have an apply run afterwards
    /*$scope.$apply(function(){
        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
        });*/
    //});
    });
    

    // Creates a new user based on the form fields
    $scope.getUsers = function() {

        // Saves the user data to the db
        $http.get('/users')
            .success(function (data) {

                $scope.listings = data;
                console.log(data);
                
                })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});