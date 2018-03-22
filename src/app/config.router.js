'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/app/form');
            
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpl/app.html'
                })
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'tpl/home.html'
                })
                .state('app.form', {
                    url: '/form',
                    templateUrl: 'tpl/form.html'
                })
                .state('app.list', {
                    url: '/form',
                    templateUrl: 'tpl/form.html'
                })
                .state('app.table', {
                    url: '/form',
                    templateUrl: 'tpl/form.html'
                })
            }
        ]
    );