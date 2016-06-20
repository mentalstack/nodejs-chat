App.controller('AccountController', ['$scope', '$rootScope', '$http', '$location', '$localStorage', 'authService', 

 function($scope, $rootScope, $http, $location, $localStorage, authService){
    
    $scope.user  = { name:'', password:''};
    $scope.alert = '';

    $scope.login = function(user){
        authService.login(user).then(function (response) { 
                                          if (response.data.success) {
                                          $localStorage.currentUser = { userName: user.name, token: response.data.token };
                                          $rootScope.userName = user.name;
                                          $location.path('/chat'); }},

                                     function (errResponse) { $scope.alert = errResponse; }
                                     );
                                  };

    $scope.signup = function(user){
        $http.post('/register', user).then(function(response){
            if (response.data.success)
            $location.path('/login');
        },
        function(errorResponse){
            $scope.alert = 'Registration failed';
        });

    };

    $scope.userinfo = function() {
        $http.get('/auth/currentuser').
            success(function (data) {
                $scope.loggeduser = data;
            }).
            error(function () {
                $location.path('/signin');
            });
    };
    
}]);