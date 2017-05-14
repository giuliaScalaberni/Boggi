'use strict';


angular.module('boggiApp',['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/',{
            url: '/',
            controller : 'homeController',
            templateUrl: 'views/home.html'
        })
        .state('user', {
    	    url: '/user',
    	    controller: 'userIndexController',
            templateUrl: 'views/userIndex.html'
        })
        .state('userShow', {
    	    url: '/user/:userEmail',
    	    controller: 'userShowController',
            templateUrl: 'views/userShow.html'
        });
});