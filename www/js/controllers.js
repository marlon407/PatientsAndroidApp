'use strict';

/* Controllers */

var patientControllers = angular.module('patientControllers', ['services']);

//Controller for Patientlist
patientControllers.controller('PatientListCtrl', ['$scope', 'MyApp', function($scope, MyApp){
    $scope.patients = [];
    db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    MyApp.all().then(function(patients){
        $scope.patients = patients;
    });

  }]);

//Controller for PatientDetail
patientControllers.controller('PatientDetailCtrl', function($scope, MyApp, $window, $routeParams) {
  //Get a specific Patient 
    $scope.patient;
    MyApp.getById($routeParams.PatientId).then(function(patient){
        $scope.patient = patient;
        $scope.patient.lastVisitDate = new Date($scope.patient.lastVisitDate);
    });;
  //Reset the form
    $scope.reset = function(){
  		this.patient = {};
    }

    $scope.delete = function(id) {
      MyApp.remove(id)
      $window.alert("Successful operation");
      $window.history.back();
    }

    $scope.backApp = function() {
        $window.history.back();
    }
    
    //Save a new Patient or update when editing
    $scope.update = function(patient) {
    	if(patient.PatientId == undefined){
	    	MyApp.save(patient);    	
	    }
	    else{
	    	MyApp.update(patient);
	    }
        $window.alert("Successful operation");
        $window.history.back();
	    
      };

  });