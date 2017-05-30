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
    'textAngular',
    'angularFileUpload',
    'ngImageInputWithPreview',
    'angular.filter',

    // Controllers, Services, Directives, Components
    'controllers',
    'services',
    'utilservice',
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
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider) {

        // enable url parameters ?
        /*
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });*/

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

        $mdThemingProvider.setDefaultTheme('day');

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

            // games state
            .state('main.games', {
                url: '/games',
                views: {
                    'content': {
                        templateUrl: 'pages/games/games.html',
                        controller: 'GamesCtrl'
                    }
                }
            })

            // new game state
            .state('main.gameNew', {
                url: '/newGame',
                views: {
                    'content': {
                        templateUrl: 'pages/games/newedit.html',
                        controller: 'GamesNewCtrl'
                    }
                }
            })

            // edit game state
            .state('main.gameEdit', {
                url: '/editGame',
                views: {
                    'content': {
                        templateUrl: 'pages/games/newedit.html',
                        controller: 'GamesEditCtrl'
                    }
                }
            })

            // notifications state
            .state('main.notifications', {
                url: '/notifications',
                views: {
                    'content': {
                        templateUrl: 'pages/notifications/notifications.html',
                        controller: 'NotificationsCtrl'
                    }
                }
            })

            // account state
            .state('main.account', {
                url: '/account',
                views: {
                    'content': {
                        templateUrl: 'pages/account/account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            // users state
            .state('main.users', {
                url: '/users',
                views: {
                    'content': {
                        templateUrl: 'pages/users/users.html',
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


    })

    /**
     * The ng-thumb directive
     * @author: nerv
     * @version: 0.1.2, 2014-01-09
     */
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);