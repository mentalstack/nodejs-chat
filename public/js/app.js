var App = angular.module('App', ['ngRoute', 'ngStorage', 'ui-notification', 'btford.socket-io' ]);

App.config(function($routeProvider, $locationProvider, $httpProvider){
   
    $httpProvider.interceptors.push('authInterceptorService');

    $routeProvider
    
    //Chat page
    .when('/chat',{
        templateUrl: 'views/chat.html',
        controller: 'ChatController'
    })
    
    //Login page
    .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'AccountController'
    })

    //Register page
    .when('/register',{
        templateUrl: 'views/register.html',
        controller: 'AccountController'
    });
     
    $locationProvider.html5Mode(true);
    
     $routeProvider.otherwise('/chat');
    
});