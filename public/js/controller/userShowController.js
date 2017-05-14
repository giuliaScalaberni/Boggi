angular.module('boggiApp')
		.controller('userShowController', function($scope, $stateParams, $http){
		   $scope.done = false;
		   $scope.info = [];
		   $scope.parseDate = function(date){
		       var ms = parseInt(date.slice(6, 19), 10);
		       var parsedDate = new Date(ms);
		       var str = parsedDate.toDateString()
		       return str;
		       
		   };
		   $scope.convertDate = function(date){
		       var parsedDate = new Date(date);
		       var str = parsedDate.toDateString();
		       return str;
		   }
		   $http({
                method: 'GET',
                url: '/api/v1/user/' + $stateParams.userEmail,
            }).then(function(response) {
                console.log(response);
                $scope.done = true;
                $scope.data = response.data;
                for(var order in response.data.Orders){
                    for(var item in response.data.Orders[order].OrderBoggiItems){
                        var found = false;
                        for(var obj in $scope.info){
                            if($scope.info[obj].type==response.data.Orders[order].OrderBoggiItems[item].GroupDescription){
                                $scope.info[obj].amount+=response.data.Orders[order].OrderBoggiItems[item].Quantita;
                                found = true;
                            }
                        }
                        if(!found){
                            $scope.info.push({type:response.data.Orders[order].OrderBoggiItems[item].GroupDescription, amount: response.data.Orders[order].OrderBoggiItems[item].Quantita});
                        }
                    }
                }
            }, function(response) {
                console.log(response);
                $scope.done = true;
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