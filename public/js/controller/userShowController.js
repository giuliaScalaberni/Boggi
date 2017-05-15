angular.module('boggiApp')

		.controller('userShowController', function($scope, $stateParams, $http){
			$scope.date= new Date();
			 $scope.birthday=1;
			 $scope.gift=1;
			 $scope.card=1;
		   $scope.done = false;
		   $scope.types = [];
			 $scope.prices = [];
			 $scope.prize=0;
		   $scope.infos = [];
			 $scope.items = [];
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



			 $scope.chooseInstagramProfile = function(instagramUsername){
					$http({
						method: 'GET',
						url: 'api/instagram/' + instagramUsername + '/media'
					}).then(function(response){
						//for(var instagramPost in response.data){
							$http({
								method: 'POST',
								url: 'api/watson/url',
								data:{
									url: response.data[0].photo
								}
							}).then(function(res){
									console.log(res);
									$scope.watsonInfo = res;
							}, function(res){
								console.log(res);
							});
						//}
					}, function(response){
						console.log(response);
					});
			 };

		   $http({
                method: 'GET',
                url: '/api/v1/user/' + $stateParams.userEmail
            }).then(function(response) {
								var i=0;
                $scope.done = true;
								$scope.OrderDate=new Date(0);
                $scope.data = response.data;
								if ((new Date(response.data.DemandwareCustomer.Birthday)).getMonth()==$scope.date.getMonth()){
									$scope.birthday=0;
								}



								var start = new Date(response.data.DemandwareCustomer.CreationDate);
								var end = new Date();

								// end - start returns difference in milliseconds
								var diff = new Date(end - start);

								// get days
								var days = diff/1000/60/60/24
								if (days>365){
									$scope.card=0;
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
                for(var order in response.data.Orders){
										var date = new Date($scope.parseDate(response.data.Orders[order].DataOrdine));
										i++;
										$scope.prize+=response.data.Orders[order].Totale;
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

								$scope.items=$scope.types;
								$scope.items.push({name: "All",y:0});
								console.log($scope.items);
								$scope.prices.sort(function(a, b) {
								    var dateA = new Date(a[0]), dateB = new Date(b[0]);
								    return dateA - dateB;
								});
								$scope.prize=Number(($scope.prize/i).toFixed(2));

								$http({
									method: 'GET',
									url: 'api/instagram/' + $scope.data.DemandwareCustomer.FirstName + ' ' + $scope.data.DemandwareCustomer.LastName
								}).then(function(response){
									$scope.instagramProfiles = response.data.data;
								}, function(response){
									console.log(response);
								})
            }, function(response) {
                console.log(response);
                $scope.done = true;
            });

						$scope.priceChartConfig = {
								chart: {
									type: 'line'
								},
								title:{
									text: 'History'
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
