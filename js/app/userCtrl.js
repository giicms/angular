/* global API, $location, App */


App.controller('login', ['$scope', '$http', '$window', '$location', '$localStorage',
    function ($scope, $http, $window, $location, $localStorage) {
        if ($localStorage.token) {
            $location.path('/video').replace();
        }
        $scope.login = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post(API.HOST + 'site/login', $scope.userModel).success(
                    function (data) {
                        if (data.meta.code == '200') {
                            $localStorage.token = data.data.access_token;
                            $window.location.href = '/';
                        } else {
                            angular.forEach(data.meta.messages, function (error) {
                                $scope.error[error.field] = error.message;
                            });
                        }
                    })
        };

    }
]);
App.controller('signup', ['$scope', '$http', '$window', '$location', '$localStorage',
    function ($scope, $http, $window, $location, $localStorage) {
        $scope.signup = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post(API.HOST + 'site/signup', $scope.userModel).success(
                    function (data) {
                        if (data.meta.code == '200') {
                            $window.location.href = '#!/login';
                        } else {
                            angular.forEach(data.meta.messages, function (error) {
                                $scope.error[error.field] = error.message;
                            });
                        }
                    })
        };

    }
]);