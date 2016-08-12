/* global API, $location, App */

App.controller('topbar', function ($scope, $rootScope, $location, $routeParams, $sce, $http, $localStorage, $window) {
    $scope.logged = false;
    if ($localStorage.token) {
        var token = $localStorage.token;
        $http({
            method: 'GET',
            url: API.HOST + 'site/token?access_token=' + token,
        }).success(function (response) {
            $scope.user = response.data;
            $scope.logged = true;
        });

        $scope.logout = function () {
            $window.localStorage.clear();
            $window.location.href = '/';
        };
    }
});

