// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl','listCtrl', 'geolocation','gservice','ngRoute']);

// configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
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