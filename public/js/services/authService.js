App.factory('authService', ['$http', '$localStorage', '$q', function Service($http, $localStorage, $q) {

var service = {};

service.login = function(user) { 

return $http.post('/authenticate', { name: user.name, password: user.password }).then(
                                function (response) {
                                    return response;
                                },
                                function (errResponse) {
                                    return $q.reject(errResponse);
                                }
                        );

        }
 
service.logout = function() { 
                    $localStorage.currentUser = {}; 
                }

return service;
 
}])
