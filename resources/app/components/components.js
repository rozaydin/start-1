/**
 * Created by rozaydin on 10/27/16.
 */

function TestCtrl($scope) {
    console.log($scope)
}

angular.module("components", [])

.component('test', {
    templateUrl: 'resources/app/components/test.html',
    controller: TestCtrl,
    bindings: {
        subject: '='
    }
});