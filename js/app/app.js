/* global angular */

var API = {
    HOST: "http://api.giicms.com/"
};
var App = angular.module('Videoclip24h', ['ngRoute', 'pagination', 'ngMessages', 'ngStorage']);

App.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
                when('/search/:key', {
                    templateUrl: '/partials/video/search.html'
                })
                .when('/video', {
                    templateUrl: '/partials/video/list.html'
                })
                .when('/video/page/:page', {
                    templateUrl: '/partials/video/list.html'
                })
                .when('/video/create', {
                    templateUrl: '/partials/video/create.html'
                })
                .when('/video/update/:id', {
                    templateUrl: '/partials/video/update.html'
                })
                .when('/video/:slug', {
                    templateUrl: '/partials/video/view.html'
                })

                .when('/login', {
                    templateUrl: '/partials/login/login.html'
                })
                .when('/signup', {
                    templateUrl: '/partials/login/signup.html'
                })
                .when('/error', {
                    templateUrl: '/partials/error.html'
                })
                .when('/', {
                    templateUrl: '/partials/video/list.html',
                    title: 'Adminstrator'
                })
                .otherwise({
                    redirectTo: '/error'
                });
//        $locationProvider.html5Mode(true);
    }])
//App.run(function ($rootScope, $location, $routeParams) {
//    $rootScope.$on("$routeChangeStart", function (event, next, current) {
//        $rootScope.isActive = function (url) {
//            var active = (url === $location.path());
//            return active;
//        };
//    });
//    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
//        if (current.hasOwnProperty('$$route')) {
//            $rootScope.title = current.$$route.title;
//        }
//    });
//
//});
App.service('MetaService', function () {
    var title = 'Web App';
    var metaDescription = '';
    var metaKeywords = '';
    return {
        set: function (newTitle, newMetaDescription, newKeywords) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            title = newTitle;
        },
        metaTitle: function () {
            return title;
        },
        metaDescription: function () {
            return metaDescription;
        },
        metaKeywords: function () {
            return metaKeywords;
        }
    }
});

App.controller('menuCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});


App.controller('homeCtrl', function ($scope, $rootScope, $routeParams, $sce, $http) {
    $http({
        method: 'GET',
        url: API.HOST + 'get_category_posts/?slug=dich-vu&count=3',
    }).success(function (response) {
        $scope.services = response.posts;
        $scope.TrustDangerousSnippet = function (key) {
            return $sce.trustAsHtml(key);
        };
        angular.forEach($scope.services, function (item) {

        });
    });
    $http({
        method: 'GET',
        url: API.HOST + 'get_category_posts/?slug=tin-tuc&count=2',
    }).success(function (response) {
        $scope.news = response.posts;
        $scope.TrustDangerousSnippet = function (key) {
            return $sce.trustAsHtml(key);
        };
        angular.forEach($scope.news, function (item) {

        });
    });
});



App.controller('jobCtrl', function ($scope, $rootScope, $location, $routeParams, $sce, $http) {
    var page = $routeParams.page;
    var pagination = [];

    $http({
        method: 'GET',
        url: API.HOST + 'job',
    }).success(function (response) {
        $scope.data = response;
        $scope.TrustDangerousSnippet = function (key) {
            return $sce.trustAsHtml(key);
        };
    });


});
App.controller('createJobCtrl', function ($scope, $rootScope, $routeParams, $window, $location, $http) {
    $scope.master = {};

    $scope.create = function (job) {
        $scope.master = angular.copy(job);
        $http({
            method: 'POST',
            url: API.HOST + 'job/create',
            data: $scope.master,
        }).success(
                function (response) {
                    $scope.data = response;
                    $scope.success = true;
                }).error(
                function (response) {
                }
        );
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.job = angular.copy($scope.master);
    };

    $scope.reset();

});

App.controller('viewCtrl', function ($scope, $rootScope, $routeParams, $sce, $http) {
    $http.get(API.HOST + 'job/view/' + $routeParams.id).success(
            function (response) {
                $scope.data = response;
                $rootScope.title = response.job.name;
                $scope.TrustDangerousSnippet = function (key) {
                    return $sce.trustAsHtml(key);
                };
            }).error(
            function (response) {
                $scope.data = response;
            }
    );
});


App.controller('indexCtrl', function ($scope, $rootScope, $routeParams, $sce, $http) {
    $http.get(API.HOST + 'user').success(function (response) {
        $scope.data = response.data.data;
    })
});

App.controller('listCtrl', function ($scope, $rootScope, $routeParams, $sce, $http) {
    $http.get(API.HOST + 'post').success(function (response) {
        $scope.data = response.data;
    })
});


App.controller('updateCtrl', function ($scope, $rootScope, $routeParams, $window, $location, $http) {
    $http.get(API.HOST + 'product/update/id/' + $routeParams.id).success(
            function (response) {
                $scope.data = response;
                $scope.updateProduct = {
                    title: response.title,
                    price: response.price,
                    stock: response.stock,
                    packing: response.packing,
                    description: response.description
                }
            }).error(
            function (response) {
                $scope.data = response;
            }
    );
    $scope.success = false;
    $scope.update = function (response) {
        $scope.submitted = true;
        $scope.error = {};
        $http.put(API.HOST + 'product/update/id/' + $routeParams.id, $scope.updateProduct).success(
                function (response) {
                    $scope.data = response;
                    $scope.success = true;
                }).error(
                function (response) {
                    angular.forEach(response, function (error) {
                        $scope.error[error.field] = error.message;
                    });
                }
        );

    };
});



App.controller('ModalCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function () {
        $scope.showModal = !$scope.showModal;
    };
});

