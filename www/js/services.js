

angular.module('services', [])
// DB wrapper
.factory('DBA', function($cordovaSQLite) {
  var self = this;
 
  // Handle query's and potential errors
  self.query = function(query, parameters) {
    return $cordovaSQLite.execute(db, query, parameters)
      .then(function(result) {
        return result;
      }, function (error) {
        console.log('I found an error');
        console.log(error);
        return error;
      });
  }
 
  // Proces a result set
  self.getAll = function(result) {
    var output = [];
 
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }
 
  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }
 
  return self;
})

// Resource service example
.factory('MyApp', function($cordovaSQLite, DBA) {
    var self = this;
    debugger;
    
    self.all = function() {
        return DBA.query('SELECT * FROM Patients')
        .then(function(result){
        	return DBA.getAll(result);
      });
    };

    self.save =function(patient){
    	return DBA.query('insert into Patients (FirstName, LastName, PhoneNo, lastVisitDate, status) values (?,?,?,?,?)', 
    		[patient.FirstName, patient.LastName, patient.PhoneNo, patient.lastVisitDate, patient.status]);
    }
    
    self.getById = function(id) {
    	var parameters = [id];
        return DBA.query('SELECT * FROM Patients WHERE PatientId = ?', parameters)
        .then(function(result) {
        	return DBA.getById(result);
      });
    };

    self.update = function(patient) {
	    var parameters = [patient.FirstName, patient.LastName, patient.PhoneNo, patient.lastVisitDate, patient.status, patient.PatientId];
	    return DBA.query("UPDATE Patients SET FirstName = (?), LastName = (?), PhoneNo = (?), lastVisitDate = (?), status = (?)  WHERE PatientId = (?)", parameters);
  	}

 	self.remove = function(id) {
    	var parameters = [id];
    	return DBA.query("DELETE FROM Patients WHERE PatientId = (?)", parameters);
 	}
    
    return self;
});