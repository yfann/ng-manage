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

            $urlRouterProvider.otherwise('/app/home');
            
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
                .state('app.buttons', {
                    url: '/buttons',
                    templateUrl: 'tpl/ui_buttons.html'
                })
                .state('app.bootstrap', {
                    url: '/bootstrap',
                    templateUrl: 'tpl/ui_bootstrap.html'
                })
                .state('app.icons', {
                    url: '/icons',
                    templateUrl: 'tpl/ui_icons.html'
                })
                .state('app.toaster', {
                    url: '/toaster',
                    templateUrl: 'tpl/ui_toaster.html'
                })
                .state('app.grid', {
                    url: '/grid',
                    templateUrl: 'tpl/ui_grid.html'
                })
            }
        ]
    );