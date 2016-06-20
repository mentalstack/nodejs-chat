App.factory('authInterceptorService', ['$q', '$injector', '$location', '$localStorage', function ($q, $injector, $location, $localStorage) {
    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = $localStorage.currentUser;
        if (authData) {
            
            config.headers.Authorization = authData.token;
        }
        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);