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
    'ngMdIcons',

    // Controllers, Services, Directives, Components
    'controllers',
    'services',
    'directives',
    'components'
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

        $mdThemingProvider.theme('day')
            .primaryPalette('light-blue')
            .warnPalette('red')
            .accentPalette('orange');
            /*.backgroundPalette('blue-grey');*/

        $mdThemingProvider.theme('dusk')
            .primaryPalette('yellow')
            .warnPalette('red')
            .accentPalette('orange');
        /*.backgroundPalette('blue-grey');*/

        $mdThemingProvider.theme('night')
            .primaryPalette('grey')
            .warnPalette('red')
            .accentPalette('blue')
            .dark();

        $mdThemingProvider.setDefaultTheme('night');

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

            // dashboard state
            .state('main.dash', {
                url: '/dash',
                views: {
                    'content': {
                        templateUrl: 'pages/dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            // settings state
            .state('main.account', {
                url: '/account',
                views: {
                    'content': {
                        templateUrl: 'pages/account.html',
                        controller: 'AccountsCtrl'
                    }
                }
            })
        
        // users state
            .state('main.users', {
                url: '/users',
                views: {
                    'content': {
                        templateUrl: 'pages/users.html',
                        controller: 'UsersCtrl'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        // $urlRouterProvider.otherwise('/login');
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('login');
        });


    });