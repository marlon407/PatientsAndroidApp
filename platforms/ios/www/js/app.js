
var db = null;
var app = angular.module('Patient', [
  'ionic',
  'ngCordova',
  'ngRoute', 
  'services',
  'patientControllers'//Adding the controllers
]).run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    debugger;
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
 
    // App syntax
    // db = $cordovaSQLite.openDB({ name: "myapp.db" });
 
    // Ionic serve syntax

    db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Patients (PatientId integer primary key AUTOINCREMENT, FirstName text, LastName text ,PhoneNo integer,lastVisitDate text, status boolean )");
  });
});

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

