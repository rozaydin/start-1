/**
 * Created by rozaydin on 10/17/16.
 */

angular.module("controllers", [])

// Login Ctrl
    .controller("LoginCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })

    // Main Ctrl
    .controller("MainCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage, $mdSidenav) {

        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };

        $scope.toggleLeft();

    })


    // Dash Ctrl
    .controller("DashCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    });



