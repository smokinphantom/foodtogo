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
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Refresh the map with new data
    gservice.refresh(parseFloat($scope.formData.latitude), parseFloat($scope.formData.longitude));
    // Functions
    // ----------------------------------------------------------------------------
    // 
    // // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

    // Run the gservice functions associated with identifying coordinates
    //$timeout(function(){
    //any code in here will automatically have an apply run afterwards
    $scope.$apply(function(){
        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
    });
    //});
});

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
            location: [$scope.formData.longitude, $scope.formData.latitude]
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
                gservice.refresh(parseFloat($scope.formData.latitude), parseFloat($scope.formData.longitude));
            })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    };
});