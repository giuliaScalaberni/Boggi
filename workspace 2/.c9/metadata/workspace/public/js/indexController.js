{"filter":false,"title":"indexController.js","tooltip":"/public/js/indexController.js","undoManager":{"mark":-1,"position":-1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":5,"column":3},"action":"remove","lines":["$(document).ready(() => {","    $('#search').click(() => {","        var clientEmail = $('#inputEmail').val();","        window.location.href = '/user/' + clientEmail;","    });","});"],"id":252},{"start":{"row":0,"column":0},"end":{"row":16,"column":5},"action":"insert","lines":["'use strict';","","","angular.module('phonecatApp',['ui.router','phoneList','phoneDetail','core','ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {","","\t$urlRouterProvider.otherwise('/phones');","","    $stateProvider","      .state('phones', {","\t\turl: '/phones',","        template: '<phone-list></phone-list>'","      })","      .state('detail', {","\t\turl: '/phones/:phoneId',","        template: '{{$ctrl.phoneId}} <phone-detail></phone-detail>'","      })","  });"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":5,"column":3},"end":{"row":5,"column":3},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1494752885386,"hash":"2f165adf306639efd38908ccf9a587d24e40a474"}