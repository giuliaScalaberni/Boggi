angular.module('boggiApp')

		.controller('userShowController', function($scope, $stateParams, $http){
			$scope.date= new Date();
			 $scope.birthday=1;

		   $scope.done = false;
			 $scope.info=[];
		   $scope.infos = [];
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
								$scope.size=[];
                $scope.done = true;
								$scope.OrderDate=new Date(0);

                $scope.data = response.data;
								if (response.data.DemandwareCustomer.Birthday==$scope.date){
									$scope.birthday=0;
								}
								for(var order in response.data.Orders){

                    for(var item in response.data.Orders[order].OrderBoggiItems){
                        var trovato = false;

                        for(var obj in $scope.infos){
                            if($scope.infos[obj].name==response.data.Orders[order].OrderBoggiItems[item].GroupDescription){
															if ($scope.parseDate(response.data.Orders[order].DataOrdine)>=$scope.OrderDate){
	                                trovato = true;
	                            }
                        		}
                    		}
												if(!trovato){
													$scope.OrderDate=$scope.parseDate(response.data.Orders[order].DataOrdine);
													$scope.infos.push({date:$scope.OrderDate, name:response.data.Orders[order].OrderBoggiItems[item].GroupDescription, size: response.data.Orders[order].OrderBoggiItems[item].Taglia});
												}
										}
                }
								console.log($scope.infos);

                for(var order in response.data.Orders){
                    for(var item in response.data.Orders[order].OrderBoggiItems){
                        var found = false;
                        for(var obj in $scope.info){
                            if($scope.info[obj].name==response.data.Orders[order].OrderBoggiItems[item].GroupDescription){
                                $scope.info[obj].y+=response.data.Orders[order].OrderBoggiItems[item].Quantita;
                                found = true;
                            }
                        }
                        if(!found){
                            $scope.info.push({name:response.data.Orders[order].OrderBoggiItems[item].GroupDescription, y: response.data.Orders[order].OrderBoggiItems[item].Quantita});
                        }
                    }
                }
            }, function(response) {
                console.log(response);
                $scope.done = true;
            });

						$scope.typeChartConfig = {
							chart: {
								type: 'pie'
							},
							title: {
								text: 'Last orders'
							},
							series: [{
					        name: 'Product type',
					        colorByPoint: true,
					        data: $scope.info
					    }]
						};

		});
