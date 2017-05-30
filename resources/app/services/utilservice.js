/**
 * Created by rozaydin on 5/2/16.
 */

angular.module('utilservice', [])

    .factory('utilSvc', ['$mdToast', '$mdDialog', '$q', '$timeout', UtilService])

function UtilService($mdToast, $mdDialog, $q, $timeout) {

    // confirm dialog
    var confirm = $mdDialog.confirm()
        .title('Kaydı Sil')
        .content('Seçili Kaydı Silmek İstediğinizden Emin misiniz ?')
        .targetEvent(null)
        .ok('Sil')
        .cancel('İptal');

    var confirmPn = $mdDialog.confirm()
        .title('Bildirim')
        .content('Bildirimlerinizi Göndermek istediğinizden Emin misiniz ?')
        .targetEvent(null)
        .ok('Evet')
        .cancel('İptal');

    var password = {
        controller: function ($scope) {
            $scope.accept = function () {
                // resolve $scope.pass1
                $mdDialog.hide($scope.pass1);
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        },
        templateUrl: 'resources/templates/passwordDialog.html',
        parent: angular.element(document.body),
        targetEvent: null,
        clickOutsideToClose: true,
        /* fullscreen: useFullScreen */
    };

    return {
        toast: function (contentText, actionText, error) {
            var toast = $mdToast.simple()
                .content(contentText)
                .action(actionText)
                .hideDelay(4000)
                .highlightAction(true)
                .position('right top');

            error ? toast.theme("error-toast") : toast.theme("success-toast");
            return $mdToast.show(toast);
        },
        showConfirm: function () {
            // using confirm dialog
            // returns a promise for ok and cancel press
            return $mdDialog.show(confirm);
        }, showConfirmPn: function () {
            // using confirm dialog
            // returns a promise for ok and cancel press
            return $mdDialog.show(confirmPn);
        },
        showPassword: function () {
            return $mdDialog.show(password);
        },
        showWait: function () {
            $mdDialog.show({
                    controller: function () {
                    },
                    template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none">' +
                    '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                    '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
                    '</div>' +
                    '</md-dialog>',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    fullscreen: true
                })
                .then(function (answer) {
                });
        },
        hideWait: function () {
            $mdDialog.cancel();
        }
    }
}