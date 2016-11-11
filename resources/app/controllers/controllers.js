/**
 * Created by rozaydin on 10/17/16.
 */

angular.module("controllers", [])

// Login Ctrl
    .controller("LoginCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })

    // Main Ctrl
    .controller("MainCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage, $mdSidenav) {

        // sidebar
        $scope.toggleLeft = function () {
            $mdSidenav("left").toggle();
        };
        // close sidebar when user navigates to another view
        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
            // when user navigates to another view close sidenav
            if ($mdSidenav("left").isOpen()) {
               $scope.toggleLeft();
            }
        });

    })

    // Dash Ctrl
    .controller("DashCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })

    // Settings Ctrl
    .controller("SettingsCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })
;



