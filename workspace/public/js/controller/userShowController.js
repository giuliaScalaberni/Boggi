angular.module('boggiApp')
		.controller('userShowController', function($scope, $stateParams, $http){
		   $http({
                method: 'GET',
                url: '/api/v1/user/' + $stateParams.userEmail,
            }).then(function(response) {
                console.log(response);
                $scope.data = response.data;
            }, function(response) {
                console.log(response);
            });
            /*$http({
                method: 'GET',
                url: 'js/controller/customer.json',
            }).then(function(response) {
                console.log(response);
                $scope.data = response.data;
            }, function(response) {
                console.log(response);
            });*/
		});