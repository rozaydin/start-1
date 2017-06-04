/**
 * Created by rozaydin on 10/12/16.
 */
angular.module("services", [])
    .constant('baseURL', 'http://localhost')
    .constant('restURL', 'http://localhost:8058/hergunebiroyun')
    .constant('imageURL', 'http://localhost/images')
    .factory('eventSvc', ['restURL', '$q', '$http', EventService]);

function EventService(restURL, $q, $http) {

    const SERVICE_REST_PATH = 'event';
    const HEADER_SET = {'Content-Type': 'application/json; charset=utf-8'};
    // generic rest handler
    const REST_HANDLER = function (promise) {
        return $q(function (resolve, reject) {
            return promise.then(
                function (success) {
                    // success
                    // console.log("original success");
                    // console.log(success);
                    resolve(success.data);
                }, function (err) {
                    // error
                    reject((err.data && err.data.message) ? err.data.message : 'Connection Error, Error Code: ' + err.status);
                });
        });
    };

    return {

        /**
         * Requests event identified with id from the server
         * via a rest call, returns a promise
         * if success, promise will return an event obj
         * if err, promise will return an error obj
         *
         * @param id: number
         */
        get: function (id) {
            return $q(function (resolve, reject) {
                return $http({
                    method: 'GET',
                    url: restURL + '/' + SERVICE_REST_PATH + '/' + id,
                    headers: HEADER_SET
                }).then(function (success) {
                    // success
                    resolve(success);
                }, function (err) {
                    // error
                    reject(err);
                });
            });
        },

        get2: function (id) {
            // generic rest handler
            return REST_HANDLER(
                $http({
                    method: 'GET',
                    url: restURL + '/' + SERVICE_REST_PATH + '/' + id,
                    headers: HEADER_SET
                })
            );
        },

        getAll: function () {
            // generic rest handler
            return REST_HANDLER(
                $http({
                    method: 'GET',
                    url: restURL + '/' + SERVICE_REST_PATH,
                    headers: HEADER_SET
                })
            );
        },

        create: function (event) {
            // generic rest handler
            return REST_HANDLER(
                $http({
                    method: 'POST',
                    url: restURL + '/' + SERVICE_REST_PATH,
                    headers: HEADER_SET,
                    data: event
                })
            );
        },

        update: function (id, event, imageUpdated) {
            // generic rest handler
            return REST_HANDLER(
                $http({
                    method: 'PUT',
                    url: restURL + '/' + SERVICE_REST_PATH + '/' + id,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'ImageUpdated': imageUpdated
                    },
                    data: event
                })
            )
        },

        delete: function (id) {
            // generic rest handler
            return REST_HANDLER(
                $http({
                    method: 'DELETE',
                    url: restURL + '/' + SERVICE_REST_PATH + '/' + id,
                    headers: HEADER_SET
                })
            );
        }
    }
}