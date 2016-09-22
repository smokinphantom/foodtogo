// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl','listCtrl','homeCtrl','geolocation','gservice','ngRoute','ui.bootstrap']);

// configure our routes
app.config(function($routeProvider) {
  $routeProvider

            // route for the home page
            .when('/', {
              templateUrl : 'pages/home.html',
              controller  : 'homeCtrl'
            })

            // route for the post page
            .when('/post', {
              templateUrl : 'pages/post.html',
              controller  : 'addCtrl'
            })

            // route for the about page
            .when('/listing', {
              templateUrl : 'pages/listing.html',
              controller  : 'listCtrl'
            })

            // route for the contact page
            .when('/contact', {
              templateUrl : 'pages/contactUs.html'
            });
          });

    //directive to set uploaded img file to the scope element
    app.directive('fileUpload', ['$parse',
      function ($parse) {
        return {
          require: 'ngModel',
          restrict: 'A',
          link: function(scope, element, attrs,ngModel) {
            var model = $parse(attrs.fileUpload);
            var modelSetter = model.assign;

            element.bind('change', function(){

              scope.$apply(function(){
                if (element[0].files.length > 1) {
                  modelSetter(scope, element[0].files);
                }
                else {
                  modelSetter(scope, element[0].files[0]);
                  var file = element[0].files[0];
                  if( file ) {
                    var img = new Image();

                    img.src = window.URL.createObjectURL( file );

                    img.onload = function() {
                      var width = img.naturalWidth,
                      height = img.naturalHeight;

                      window.URL.revokeObjectURL( img.src );


                      if( width ==100 && height ==100 ) {

                        ngModel.$setViewValue(element.val());
                        ngModel.$render();
                      }
                      else {
                        ngModel.$setViewValue('');
                        ngModel.$render();
                        //fail
                        alert("File size is not 100 x 100. Please resize it and try uploading again");
                      }
                    };
                  }
                  else{
                    ngModel.$setViewValue(element.val());
                    ngModel.$render();
                  }
                }
              });
});

}
};
}
])