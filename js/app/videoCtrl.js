/* global API, $location, App */

App.controller('listvideo', function ($scope, $rootScope, $location, $routeParams, $sce, $http, $localStorage, MetaService) {
    var page = $routeParams.page;
    $scope.item = [];
    $scope.token = $localStorage.token;
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Web App", "description", "keywords");
    $http({
        method: 'GET',
        url: API.HOST + 'video',
    }).success(function (response) {
        $scope.items = response.data;
        $scope.totalCount = response.totalCount;
        $scope.page = response.page;
        $scope.limit = response.limit;
    });
    $scope.delete = function (id) {
        $http({
            method: 'GET',
            url: API.HOST + 'video/delete/' + id,
        }).success(function (response) {
            $location.path('/video').replace();
        });
    };
    $scope.show = function (page) {
        $http({
            method: 'GET',
            url: API.HOST + 'video?page=' + page,
        }).success(function (response) {
            var obj = response.data;

            for (var i = 0; i < response.count; i++) {
                $scope.items.push(obj[i]);// Push data
            }
            $scope.totalCount = response.totalCount;
            $scope.count = response.count;
            $scope.page = response.page;
            $scope.limit = response.limit;
        });
    };
});


App.controller('createvideo', function ($scope, $rootScope, $routeParams, $window, $location, $http) {
    $scope.video = {};
    $scope.create = function () {
        $http({
            url: API.HOST + 'video/create',
            method: "POST",
            data: this.video,
            headers: {
                "Content-Type": "application/json",
            }
        }).success(function (response) {
            $scope.response = response;
            $location.path('/video').replace();
        }).error(function (error) {
            $scope.error = error;
            alert('error');
        }
        );
    };
});
App.controller('keywordsvideo', function ($scope, $rootScope, $routeParams, $window, $location, $http) {
    $scope.video = {};
    $scope.search = function () {
        $location.path('/search/' + this.video.keywords).replace();
    };
});
App.controller('searchvideo', function ($scope, $rootScope, $location, $routeParams, $sce, $http) {
    var page = $routeParams.page;
    var key = $routeParams.key;
    $scope.item = [];
    $http({
        method: 'GET',
        url: API.HOST + 'video/search?key=' + key,
    }).success(function (response) {
        $scope.items = response.data;
        $scope.totalCount = response.totalCount;
        $scope.count = response.count;
        $scope.page = response.page;
        $scope.limit = response.limit;
    });

    $scope.show = function (page) {
        $http({
            method: 'GET',
            url: API.HOST + 'video/search?key=' + key + '&page=' + page,
        }).success(function (response) {
            var obj = response.data;
            for (var i = 0; i < response.count; i++) {
                $scope.items.push(obj[i]);// Push data
            }
            $scope.totalCount = response.totalCount;
            $scope.count = response.count;
            $scope.page = response.page;
            $scope.limit = response.limit;
        });
    };
});
App.controller('updatevideo', function ($scope, $rootScope, $routeParams, $window, $location, $http) {
    $scope.video = {};
    $http.get(API.HOST + 'video/update/' + $routeParams.id).success(
            function (response) {
                $scope.data = response;
                $scope.video = {
                    title: $scope.data.title,
                    keywords: $scope.data.keywords,
                    description: $scope.data.description
                };
            }).error(
            function (response) {
                $scope.data = response;
            }
    );

    $scope.update = function () {
        $http({
            url: API.HOST + 'video/update/' + $routeParams.id,
            method: "PUT",
            data: this.video,
            headers: {
                "Content-Type": "application/json",
            }
        }).success(function (response) {
            $scope.response = response;
            $location.path('/video').replace();
        }).error(function (error) {
            $scope.error = error;
            alert('error');
        }
        );
    };
});
App.controller('viewvideo', function ($scope, $rootScope, $routeParams, $sce, $http, MetaService) {
    $rootScope.metaservice = MetaService;
    $http.get(API.HOST + 'video/' + $routeParams.slug).success(
            function (response) {
                $scope.data = response.data;
                $scope.last = response.last;
                $rootScope.metaservice.set(response.data.title, response.data.title, "keywords");
                $scope.TrustDangerousSnippet = function (key) {
                    return $sce.trustAsHtml(key);
                };
            }).error(
            function (response) {
                $scope.data = response;
            }
    );
});
