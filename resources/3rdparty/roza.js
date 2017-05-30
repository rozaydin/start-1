/*!
 * ng-image-input-with-preview v0.0.6
 * https://github.com/deiwin/ngImageInputWithPreview
 *
 * A FileReader based directive to easily preview and upload image files.
 *
 * Copyright 2015, Deiwin Sarjas <deiwin.sarjas@gmail.com>
 * Released under the MIT license
 */
(function (angular, undefined) {
    'use strict';

    // src/js/fileReader.service.js
    (function () {
        'use strict';
        var module = angular.module('fileReaderService', []);

        // Copied from the following link with onProgress excluded because it's not needed
        // http://odetocode.com/blogs/scott/archive/2013/07/03/building-a-filereader-service-for-angularjs-the-service.aspx
        module.factory('fileReader', ['$q',
            function ($q) {
                var onLoad = function (reader, deferred, scope) {
                    return function () {
                        scope.$apply(function () {
                            deferred.resolve(reader.result);
                        });
                    };
                };

                var onError = function (reader, deferred, scope) {
                    return function () {
                        scope.$apply(function () {
                            deferred.reject(reader.result);
                        });
                    };
                };

                var getReader = function (deferred, scope) {
                    var reader = new FileReader();
                    reader.onload = onLoad(reader, deferred, scope);
                    reader.onerror = onError(reader, deferred, scope);
                    return reader;
                };

                var readAsDataURL = function (file, scope) {
                    var deferred = $q.defer();

                    var reader = getReader(deferred, scope);
                    reader.readAsDataURL(file);

                    return deferred.promise;
                };

                return {
                    readAsDataUrl: readAsDataURL
                };
            }
        ]);
    })();

    // src/js/imageWithPreview.directive.js
    /*jshint -W072 */
    // ^ ignore jshint warning about link method having too many parameters
    (function () {
        'use strict';
        var module = angular.module('ngImageInputWithPreview', [
            'fileReaderService',
        ]);

        module.directive('imageWithPreview', ['fileReader', '$q',
            function (fileReader, $q) {
                var DEFAULT_MIMETYPES = 'image/png,image/jpeg';
                var NOT_AN_IMAGE = 'this-is-not-an-image';

                var isAnAllowedImage = function (allowedTypes, file) {
                    if (!allowedTypes) {
                        allowedTypes = DEFAULT_MIMETYPES;
                    }
                    var allowedTypeArray = allowedTypes.split(',');
                    return allowedTypeArray.some(function (allowedType) {
                        if (allowedType === file.type) {
                            return true;
                        }
                        var allowedTypeSplit = allowedType.split('/');
                        var fileTypeSplit = file.type.split('/');
                        return allowedTypeSplit.length === 2 && fileTypeSplit.length === 2 && allowedTypeSplit[1] === '*' &&
                            allowedTypeSplit[0] === fileTypeSplit[0];
                    });
                };
                var createResolvedPromise = function () {
                    var d = $q.defer();
                    d.resolve();
                    return d.promise;
                };

                var resizeImage = function (image, width, height) {
                    var canvas = document.createElement('canvas');
                    canvas.width  = width;
                    canvas.height = height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, width, height);
                    return canvas.toDataURL();
                };

                return {
                    restrict: 'A',
                    require: 'ngModel',
                    scope: {
                        image: '=ngModel',
                        base64: '=base64',
                        thumbnail: '=thumbnail',
                        allowedTypes: '@accept',
                        imagesize:'@imagesize',
                        thumbnailsize:'@thumbnailsize'
                    },
                    link: function ($scope, element, attrs, ngModel) {
                        element.bind('change', function (event) {
                            var file = (event.srcElement || event.target).files[0];
                            // the following link recommends making a copy of the object, but as the value will only be changed
                            // from the view, we don't have to worry about making a copy
                            // https://docs.angularjs.org/api/ng/type/ngModel.NgModelController#$setViewValue
                            ngModel.$setViewValue(file, 'change');
                        });
                        ngModel.$parsers.push(function (file) {
                            if (!file) {
                                return file;
                            }
                            if (!isAnAllowedImage($scope.allowedTypes, file)) {
                                return NOT_AN_IMAGE;
                            }
                            return {
                                fileReaderPromise: fileReader.readAsDataUrl(file, $scope),
                            };
                        });
                        $scope.$watch('image', function (value) {
                            if (value && value.src && typeof value.src === 'string') {
                                $scope.image = {
                                    src: value,
                                    isPath: true,
                                };
                                // set data url
                                $scope.base64 = value.src;
                                // set thumbnail
                                $scope.thumbnail = value.thumbnail;
                            }
                        });
                        ngModel.$validators.image = function (modelValue, viewValue) {
                            var value = modelValue || viewValue;
                            return value !== NOT_AN_IMAGE;
                        };
                        ngModel.$asyncValidators.parsing = function (modelValue, viewValue) {
                            var value = modelValue || viewValue;
                            if (!value || !value.fileReaderPromise) {
                                return createResolvedPromise();
                            }
                            // This should help keep the model value clean. At least I hope it does
                            value.fileReaderPromise.finally(function () {
                                delete value.fileReaderPromise;
                            });
                            return value.fileReaderPromise.then(function (dataUrl) {
                                return $q(function (resolve, reject) {
                                    var image = new Image();
                                    image.onload = function () {
                                        // create thumbnail
                                         console.log('in directive '+$scope.imagesize);
                                        //DEFAULT VALUES
                                        var imagesize ={width:512,height:384};
                                        var thumbnailsize ={width:512,height:384};

                                        if($scope.imagesize){
                                            imagesize = JSON.parse($scope.imagesize);
                                        }

                                        if($scope.thumbnailsize){
                                            thumbnailsize = JSON.parse($scope.thumbnailsize);
                                        }

                                        console.log(imagesize.width+'-'+imagesize.height);
                                        console.log(thumbnailsize.width+'-'+thumbnailsize.height);
                                        value.thumbnail = resizeImage(image, thumbnailsize.width, thumbnailsize.height);
                                        value.src = resizeImage(image, imagesize.width, imagesize.height);
                                        resolve(value);
                                    };
                                    image.src = dataUrl;
                                });
                            }, function () {
                                return $q.reject('Failed to parse');
                            });
                        };
                    }
                };
            }
        ]);
    })();
})(window.angular);
