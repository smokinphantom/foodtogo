// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation','gservice']);
addCtrl.controller('addCtrl', function($scope, $http,$rootScope,$timeout, geolocation,gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.latitude = 39.500;
    $scope.longitude = -98.350;

    // Functions
    // ----------------------------------------------------------------------------
    // 
    // // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        $scope.latitude = parseFloat(gservice.clickLat).toFixed(3);
        $scope.longitude = parseFloat(gservice.clickLong).toFixed(3);
});

     $rootScope.$on("setmap", function(){

        $scope.oldMap = gservice.oldMap;
});

    // Refresh the map with new data
    gservice.refresh(parseFloat($scope.latitude), parseFloat($scope.longitude));

    $scope.findMarker = function(){
        gservice.setMarker($scope.formData.country,$scope.formData.state,$scope.formData.zipcode,$scope.oldMap);
    }

    
    // Creates a new user based on the form fields
    $scope.createUser = function() {

        var fd= new FormData();
        fd.append('file', $scope.myFile);

        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            email: $scope.formData.email,
            phone: $scope.formData.phone,
            cuisine: $scope.formData.cuisine,
            desc: $scope.formData.desc,
            country: $scope.formData.country,
            state: $scope.formData.state,
            location: [$scope.longitude, $scope.latitude]
        };

        fd.append("data", JSON.stringify(userData));

        // Saves the user data to the db
        $http.post('/users', fd,
        {

            withCredentials : false,

            headers : {
                'Content-Type' : undefined
            },
            transformRequest : angular.identity

        })
        .success(function (data) {

                 //Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.email="";
                $scope.formData.phone="";
                $scope.formData.cuisine="";
                $scope.formData.desc="";
                $scope.formData.country="";
                $scope.formData.state="";
                
                // Refresh the map with new data
                gservice.refresh(parseFloat($scope.latitude), parseFloat($scope.longitude));
            })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    };
});