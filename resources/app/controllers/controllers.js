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
        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            // when user navigates to another view close sidenav
            if ($mdSidenav("left").isOpen()) {
                $scope.toggleLeft();
            }
        });

    })

    // Dash Ctrl
    .controller("DashCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })

    // Account Ctrl
    .controller("AccountCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })

    // Users Ctrl
    .controller("UsersCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })

    // Games Ctrl
    .controller("GamesCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage, $timeout, imageURL, eventSvc, utilSvc) {

        $scope.imageURL = imageURL;
        $scope.selected = [];
        $scope.events = [];

        $scope.query = {
            page: 1,
            limit: 25
        };

        $scope.entry = {
            title: null,
            day: null,
            thumbnail: null,
            image: null,
            html: null
        };

        // load events from the server
        eventSvc.getAll().then(
            // success
            function (events) {
                console.log(events);
                $scope.events = events;
            },
            // error
            function (err) {
                console.log(err);
            });

        // handle edit
        $scope.handleEdit = function (event) {
            $sessionStorage.selectedEvent = event;
            $state.go('main.gameEdit');
        };

        // handle edit
        $scope.handlePreview = function (event) {
            $sessionStorage.selectedEvent = event;
            $state.go('main.gamePreview');
        };

        // handle delete
        $scope.handleDelete = function (event) {
            utilSvc.showConfirm().then(
                // handle delete
                function () {
                    eventSvc.delete(event.id).then(
                        function () {
                            _.remove($scope.events, function (elem, index, array) {
                                return event.id === elem.id;
                            });
                            // inform user
                            utilSvc.toast("ilgili kayit silindi", "", false);
                        },
                        function (err) {
                            console.log(err);
                            utilSvc.toast("Kayit sistemde olusan bir hata yuzunden silinemedi!", "", true);
                        })
                },
                // handle cancel
                function () {
                });
        };
    })

    // Games Ctrl
    .controller("GamesNewCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage, $timeout, imageURL, eventSvc, utilSvc) {

        $scope.entry = {
            title: null,
            day: null,
            thumbnail: null,
            image: null,
            html: null
        };
        // Base URL for images
        $scope.imageURL = imageURL;
        $scope.state = 'New';

        // Handle File Input Clicks
        $scope.triggerFileInput = function ($event) {
            var currentTarget = $event.currentTarget;
            $timeout(function () {
                currentTarget.getElementsByClassName('image-selector')[0].click();
            }, 0, false);
        };

        // handle submit
        $scope.handleSubmit = function () {
            // console.log($scope.entry);
            eventSvc.create($scope.entry).then(
                // success
                function (data) {
                    console.log(data);
                    utilSvc.toast('Yeni Kayit Basari ile Olusturuldu', '', false);
                },
                // error
                function (err) {
                    console.log(err);
                    utilSvc.toast('Sistemde olusan bir hata yuzunden kayit olusturulamadi', '', true);
                });
        };

        // handle cancel
        $scope.handleCancel = function () {
            $scope.entry = {};
            $state.go('main.games');
        };

    })

    // Games Ctrl
    .controller("GamesEditCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage, $timeout, imageURL, eventSvc, utilSvc) {

        $scope.entry = $sessionStorage.selectedEvent;
        // BaseUrl For Images
        $scope.imageURL = imageURL;
        $scope.state = 'Edit';
        $scope.imageUpdated = false;

        // Handle File Input Clicks
        $scope.triggerFileInput = function ($event) {
            var currentTarget = $event.currentTarget;
            $timeout(function () {
                currentTarget.getElementsByClassName('image-selector')[0].click();
            }, 0, false);
            // image updated
            $scope.imageUpdated = true;
        };

        // handle submit
        $scope.handleSubmit = function () {
            // console.log($scope.entry);
            eventSvc.update($scope.entry.id, $scope.entry, $scope.imageUpdated).then(
                // success
                function (data) {
                    console.log(data);
                    utilSvc.toast('Guncelleme Basarili', '', false);
                },
                // error
                function (err) {
                    console.log(err);
                    utilSvc.toast('Sistemde olusan bir hata yuzunden kayit guncellenemedi', '', true);
                });
        };

        // handle cancel
        $scope.handleCancel = function () {
            $scope.entry = {};
            $state.go('main.games');
        };
    })


    // Games Ctrl
    .controller("GamesPreviewCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage, $timeout, imageURL, eventSvc, utilSvc) {

        $scope.entry = $sessionStorage.selectedEvent;
        $scope.imageURL = imageURL;

        console.log($scope.entry);

        // BaseUrl For Images
        $scope.imageURL = imageURL;
        $scope.state = 'Preview';

        // handle cancel
        $scope.handleClose = function () {
            $scope.entry = {};
            $state.go('main.games');
        };
    })

    // Notifications Ctrl
    .controller("NotificationsCtrl", function ($scope, $state, $stateParams, $sessionStorage, $localStorage) {

    })
;
