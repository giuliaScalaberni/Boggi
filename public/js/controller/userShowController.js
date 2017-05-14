angular.module('boggiApp')

		.controller('userShowController', function($scope, $stateParams, $http){
			$scope.date= new Date();
			 $scope.birthday=1;
			 $scope.gift=1;
		   $scope.done = false;
		   $scope.types = [];
			 $scope.prices = [];
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

			 $scope.add = function() {
			    var f = document.getElementById('file').files[0],
			        r = new FileReader();

			    r.onloadend = function(e) {
			      var data = e.target.result;
			      $http({
							method: 'POST',
							url: '/api/watson',
							data: data
						}).then(function(response){
							console.log(response);
						}, function(response){
							console.log(response);
						});
			    }

			    r.readAsBinaryString(f);
			}

		   $http({
                method: 'GET',
                url: '/api/v1/user/' + $stateParams.userEmail,
            }).then(function(response) {
                $scope.done = true;
								$scope.OrderDate=new Date(0);
                $scope.data = response.data;
								console.log((new Date(response.data.DemandwareCustomer.Birthday)).getMonth());
								if ((new Date(response.data.DemandwareCustomer.Birthday)).getMonth()==$scope.date.getMonth()){
									$scope.birthday=0;
								}
								for(var order in response.data.Orders){

                    for(var item in response.data.Orders[order].OrderBoggiItems){
											if (!item.OrdineRegalo){
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
											else {
												$scope.gift=0;
											}
										}
                }
								console.log($scope.infos);

                for(var order in response.data.Orders){
										var date = new Date($scope.parseDate(response.data.Orders[order].DataOrdine));
										$scope.prices.push([Date.UTC(date.getFullYear(), date.getMonth(), date.getDay()), response.data.Orders[order].Totale]);
                    for(var item in response.data.Orders[order].OrderBoggiItems){
                        var found = false;
                        for(var obj in $scope.types){
                            if($scope.types[obj].name==response.data.Orders[order].OrderBoggiItems[item].GroupDescription){
                                $scope.types[obj].y+=response.data.Orders[order].OrderBoggiItems[item].Quantita;
                                found = true;
                            }
                        }
                        if(!found){
                            $scope.types.push({name:response.data.Orders[order].OrderBoggiItems[item].GroupDescription, y: response.data.Orders[order].OrderBoggiItems[item].Quantita});
                        }
                    }
                }
            }, function(response) {
                console.log(response);
                $scope.done = true;
            });

						$scope.priceChartConfig = {
								chart: {
									type: 'line'
								},
								title:{
									text: 'Price'
								},
								plotOptions: {
			            area: {
			                fillColor: {
			                    linearGradient: {
			                        x1: 0,
			                        y1: 0,
			                        x2: 0,
			                        y2: 1
			                    },
			                    stops: [
			                        [0, Highcharts.getOptions().colors[0]],
			                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
			                    ]
			                },
			                marker: {
			                    radius: 2
			                },
			                lineWidth: 1,
			                states: {
			                    hover: {
			                        lineWidth: 1
			                    }
			                },
			                threshold: null
			            }
			        },
							xAxis: {
					        type: 'datetime'
					    },
					    yAxis: {
					        title: {
					            text: 'Price (€)'
					        }
					    },
							series: [{
			            type: 'area',
			            name: 'Order price',
			            data: $scope.prices
			        }]
						};

						$scope.typeChartConfig = {
							chart: {
								type: 'pie'
							},
							title: {
								text: 'Last orders'
							},
							series: [{
					        name: 'Product amount',
					        colorByPoint: true,
					        data: $scope.types
					    }]
						};

		});
