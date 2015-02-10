

angular.module('services', ['config'])
// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;
 
    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
 
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };
 
    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
})
// Resource service example
.factory('MyApp', function(DB) {
    var self = this;
    
    self.all = function() {
        return DB.query('SELECT * FROM Patients')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.save =function(patient){
    	debugger;
    	return DB.query('insert into Patients (FirstName, LastName, PhoneNo, lastVisitDate, status) values ("?","?","?":,"?","?",?)', 
    		[patient.FirstName, patient.LastName, patient.PhoneNo, patient.lastVisitDate, patient.status ])
        .then(function(result){
            return DB.fetch(result);
        });
    }
    
    self.getById = function(id) {
        return DB.query('SELECT * FROM Patients WHERE PatientId = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return self;
});