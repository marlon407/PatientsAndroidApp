angular.module('config', [])
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'Patients',
            columns: [
                {name: 'PatientId', type: 'integer primary key'},
                {name: 'FirstName', type: 'text'},
                {name: 'LastName', type: 'text'},
                {name: 'PhoneNo', type: 'integer'},
                {name: 'lastVisitDate', type: 'text'},
                {name: 'filename', type: 'bool'}
            ]
        }
    ]
});