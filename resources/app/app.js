/**
 * Created by rozaydin on 9/29/16.
 */

angular.module('app', ['ui.router',
    'ngMaterial',
    'ngMessages',
    'ngLetterAvatar',
    'md.data.table',
    'ngStorage',
    'permission',
    'permission.ui',
    'ngSanitize',

    // Controllers, Services, Directives

    'controllers',
    'services',
    'directives'
])


/**
 *  get executed after the injector is created and are used to kickstart the application.
 *  Only instances and constants can be injected into run blocks.
 *  This is to prevent further system configuration during application run time.
 */
    .run(function ($rootScope) {

    })

    /**
     *  get executed during the provider registrations and configuration phase.
     *  Only providers and constants can be injected into configuration blocks.
     *  This is to prevent accidental instantiation of services before they have been fully configured.
     */
    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider) {

        // Configure States

        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'pages/login.html',
                controller: 'LoginCtrl'
            })

            // abstract main state
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'pages/main.html',
                controller: 'MainCtrl',
                /*
                 data: {
                 permissions: {
                 only: ['ADMIN'],
                 redirectTo: 'login'
                 }
                 }*/
            })

            // settings state
            .state('main.dash', {
                url: '/dash',
                views: {
                    'content': {
                        templateUrl: 'pages/dash.html',
                        controller: 'DashCtrl'
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        // $urlRouterProvider.otherwise('/login');
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('login');
        });


    });