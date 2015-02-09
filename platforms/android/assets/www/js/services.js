'use strict';		
		
/* Services */		
		
var patientServices = angular.module('patientServices', ['ngResource']);		
		
patientServices.factory('Patient', ['$resource',		
  function($resource){		
    return $resource('Data/Patient.json', {}, {		
      query: {method:'GET'}		
   });		
}]);