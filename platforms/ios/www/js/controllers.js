'use strict';

/* Controllers */

var patientControllers = angular.module('patientControllers', ['services']);



var wholeData = [];//Array that simulates my database

//Set the list of patients into the array
var setArray = function(data)
{
	wholeData = data;
};

//Returns all patients into the array
var GetArray = function()
{
	return wholeData;
}

//Add a new Patient int my array of patients
var AddNewObj = function(patient)
{
	wholeData.push(patient);
}

//From the array of patients, get a specific patients by the PatientId
var getById = function(id) {
	var arr = GetArray();
	for (var d = 0; d < arr.length; d += 1) {
    	if (arr[d].PatientId == id) {

            arr[d].lastVisitDate = new Date(arr[d].lastVisitDate);
        	return arr[d];
    	}
	}
}

//Returns the biggest PatientId number from that array of patients 
//to set as PatientId to a new patient
var findMaxId = function(){
	var maxid = 0;
	GetArray().map(function(obj){     
    	if (obj.PatientId > maxid) maxid = obj.PatientId;    
	});
	return maxid;
}

//Controller for Patientlist
patientControllers.controller('PatientListCtrl', ['$scope', 'MyApp', function($scope, MyApp){
    debugger;
    $scope.orderProp = 'LastName';//Set the property for sort
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

    $scope.delete = function(id){
        remove(GetArray(), id);
        $window.alert("Successful operation");
        $window.history.back();
    }

    function remove(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i].PatientId === item) {
              arr.splice(i, 1);
          }
      }
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
	    	var tempPatient = getById($routeParams.PatientId);
	    	tempPatient.FirstName = patient.FirstName;
	    	tempPatient.LasttName = patient.LasttName;
	    	tempPatient.Status = patient.Status;
	    	tempPatient.lastVisitDate = patient.lastVisitDate;
	    	tempPatient.PhoneNo = patient.PhoneNo;
	    }
	    
      };

  });