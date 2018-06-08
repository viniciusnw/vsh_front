"use strict";

// Main module name
var app = angular.module('vsh', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'angular-loading-bar',
]);

// App configuration constants
app.constant('$frontendUrl', 'http://localhost:8000');
app.constant('$urlApi',      'http://vsh-api'); 

// App initialization
app.run(function( AuthService ) {
    
    AuthService.loadPages();
});
