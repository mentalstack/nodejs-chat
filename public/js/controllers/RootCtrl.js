App.controller('RootController', ['$scope', '$rootScope', '$location','authService','$localStorage',

 function($scope, $rootScope, $location, authService, $localStorage){

$rootScope.userName = $localStorage.currentUser.userName;

       $scope.logout = function(){
        authService.logout();
        $location.path('/login');
    }; 
    
}]);