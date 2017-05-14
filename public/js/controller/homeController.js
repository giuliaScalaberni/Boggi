angular.module('boggiApp')
	.controller('homeController', function($scope){

		$scope.check=function(){
			if($scope.email==""){
				alert('error');
				 
			}

		};
	});
