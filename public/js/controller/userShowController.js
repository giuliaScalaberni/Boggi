angular.module('boggiApp')

		.controller('userShowController', function($scope, $stateParams, $http){

			$scope.tabs = [{name: "Customer data", url: "views/customerUserPartial.html"},
			 							 {name: "Instagram data", url: "views/instagramUserPartial.html"},
										 {name: "Twitter data", url: "views/twitterUserPartial.html"}];

			$scope.changeTab = function(url){
				$scope.partial = url;
			};

			$scope.partial = "views/customerUserPartial.html";
			 $scope.date= new Date();
			 $scope.birthday=true;
			 $scope.gift=true;
			 $scope.card=true;
		   $scope.done = false;
		   $scope.types = [];
			 $scope.prices = [];
			 $scope.prize=0;
		   $scope.infos = [];
			 $scope.items = [];
			 $scope.sel=[];
			 $scope.chart=false;
			 $scope.twitterChart=false;
			 $scope.test = '';


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

			 $scope.instagramData = [];
			 $scope.isInstagramSelected = false;
			 $scope.watsonVrInfos=[];

			 $scope.chooseInstagramProfile = function(instagramUsername){
					$http({
						method: 'GET',
						url: 'api/instagram/' + instagramUsername + '/media'
					}).then(function(response){
						$scope.isInstagramSelected = true;
						if(response.data['userPhoto']){
						for(var i = 0; i < 2; i++){
							$http({
								method: 'POST',
								url: 'api/watson/vr/url',
								data:{
									url: response.data.userPhoto[i].photo
								}
							}).then(function(res){
								$scope.chart=true;
								/*!!!!IMPORTANT CHANGE!!!*/
									$scope.watsonVrInfos.push(res.data.images[0].classifiers[0].classes);
									for(var watsonVrInfo in $scope.watsonVrInfos){
										for(var info in $scope.watsonVrInfos[watsonVrInfo]){
											$scope.instagramData.push({name: $scope.watsonVrInfos[watsonVrInfo][info].class, y: $scope.watsonVrInfos[watsonVrInfo][info].score * 100})
										}
									}
							}, function(res){
								console.log(res);
							});
						}
					}
					}, function(response){
						console.log(response);
					});
			 };

		 	$scope.backToInstagramIndex = function(){
				$scope.instagramData = [];
				$scope.chart = false;
				$scope.isInstagramSelected = false;
				$scope.watsonVrInfos = [];
		 	};

			$scope.backToTwitterIndex = function(){
				$scope.twitterData = [];
				$scope.watsonNluInfo=[];
				$scope.twitterChart = false;
				$scope.isTwitterSelected = false;
			}

			 $scope.twitterData=[];
			 $scope.isTwitterSelected = false;
			 $scope.watsonNluInfo=[];

			 $scope.chooseTwitterProfile = function(twitterUsername){
					$http({
						method: 'GET',
						url: 'api/twitter/' + twitterUsername + '/tweets'
					}).then(function(response){
						$scope.isTwitterSelected = true;
						if(response.data.StringTweets != ''){
								$http({
									method: 'POST',
									url: 'api/watson/nlu',
									data:{
										text: response.data.StringTweets
									}
								}).then(function(res){
									$scope.twitterChart=true;
									$scope.watsonNluInfo = res.data.categories;
									for(var info in $scope.watsonNluInfo){
										var labels = $scope.watsonNluInfo[info].label.split("/");
										$scope.twitterData.push({name: labels[labels.length - 1], y:$scope.watsonNluInfo[info].score * 100})
									}

								}, function(res){
									console.log(res);
								});
							}
							else{
								$scope.test = 'No Items here';
							}
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
									$scope.birthday=false;
								}



								var start = new Date(response.data.DemandwareCustomer.CreationDate);
								var end = new Date();

								// end - start returns difference in milliseconds
								var diff = new Date(end - start);

								// get days
								var days = diff/1000/60/60/24;
								if (days>365){
									if ((new Date(response.data.DemandwareCustomer.Birthday)).getMonth()==$scope.date.getMonth()){
										$scope.card=false;
									}
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
												$scope.gift=false;
											}
										}
                }
                for(var order in response.data.Orders){
										var date = new Date($scope.parseDate(response.data.Orders[order].DataOrdine));
										i++;
										$scope.prize+=response.data.Orders[order].TotaleScontatoEur;
										$scope.prices.push([Date.UTC(date.getFullYear(), date.getMonth(), date.getDay()), response.data.Orders[order].TotaleScontatoEur]);
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
								});
								$http({
									method: 'GET',
									url: 'api/twitter/' + $scope.data.DemandwareCustomer.FirstName + ' ' + $scope.data.DemandwareCustomer.LastName
								}).then(function(response){
									$scope.twitterProfiles = response.data;
								}, function(response){
									console.log(response);
								});
            }, function(response) {
                console.log(response);
                $scope.done = true;
            });

						$scope.priceChartConfig = {
								chart: {
									type: 'area'
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
					    }],
							colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']

						};


						$scope.twitterChartConfig={
							chart:{
								type: 'column'
							},
							title:{
								text: 'Twitter'
							},
							xAxis: {
					        type: 'category'
					    },
							yAxis:{
								title:{
									text: 'Score(%)'
								}
							},
							plotOptions: {
					        series: {
					            borderWidth: 0,
					            dataLabels: {
					                enabled: true,
					                format: '{point.y:.1f}%'
					            }
					        }
					    },
							series: [{
								name: 'Preferences',
								colorByPoint: true,
								data: $scope.twitterData
							}]
						}

						$scope.instagramChartConfig={
							chart:{
								type: 'column'
							},
							title:{
								text: 'Instagram'
							},
							xAxis: {
					        type: 'Classes'
					    },
							yAxis:{
								title:{
									text: 'Score(%)'
								}
							},
							plotOptions: {
					        series: {
					            borderWidth: 0,
					            dataLabels: {
					                enabled: true,
					                format: '{point.y:.1f}%'
					            }
					        }
					    },
							series: [{
								name: 'Classes',
								colorByPoint: true,
								data: $scope.instagramData
							}]
						}
		});
