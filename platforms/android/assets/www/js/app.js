'use strict';

/* App Module */

var app = angular.module('Patient', [
  'ngRoute', 
  'services',
  'patientControllers'//Adding the controllers
]);


app.run(function(DB) {
    DB.init();
})

//Providing routes for the whole applicarion so far
//I am not using Express at this point.
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/patients', {
        templateUrl: 'Views/PatientList.html',
        controller: 'PatientListCtrl'
      }).
      when('/patients/:PatientId', {
        templateUrl: 'Views/PatientDetails.html',
        controller: 'PatientDetailCtrl'
      }).
      otherwise({
        redirectTo: '/patients'
      });
  }]);

