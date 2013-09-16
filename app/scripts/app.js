'use strict';

angular.module('pmfApp.services', ['ngResource', 'ngCookies']);
angular.module('pmfApp.directives', []);
angular.module('pmfApp.filters', []);

angular.module('pmfApp', ['ui.bootstrap', 'ui.compat', 'pmfApp.services',
        'pmfApp.directives', 'pmfApp.filters', 'ngCookies', 'ngGrid', 'angularBootstrapNavTree'])
    .config(function ($stateProvider, $routeProvider, $urlRouterProvider, $httpProvider, $locationProvider, $interpolateProvider) {

        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
        //$locationProvider.html5Mode(true)

        $urlRouterProvider.otherwise('/');

        $routeProvider.when('/', {
            redirectTo: '/home'
        });

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    content: {
                        controller: 'HomeCtrl',
                        templateUrl: 'views/home.html'
                    }
                }
            })
            .state('config', {
                url: '/config',
                views: {
                    content: {
                        templateUrl: 'views/config.html'
                    },
                    sidenav: {
                        templateUrl: 'views/default-side-nav.html'
                    }
                }
            })
            .state('execution', {
                url: '/execution',
                views: {
                    content: {
                        controller: 'ExecutionCtrl',
                        templateUrl: 'views/execution.html'
                    },
                    sidenav: {
                        controller: 'ExecutionCtrl',
                        templateUrl: 'views/default-side-nav.html'
                    }
                }
            })
            .state('new', {
                url: '/new',
                views: {
                    content: {
                        templateUrl: 'views/new.html'
                    }
                }
            });

        var interceptor = ['$location', '$q', '$cookieStore', '$rootScope',
            function ($location, $q, $cookieStore, $rootScope) {
                function success(response) {
//                console.log('Success Response', response);
                    return response;
                }

                function error(response) {
                    console.log('Error Response', response);

                    if (response.status === 401) {
                        $location.path('/home');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }

                return function (promise) {
                    return promise.then(success, error);
                }
            }];

        $httpProvider.responseInterceptors.push(interceptor);

        //$httpProvider.defaults.withCredentials = true;

        $httpProvider.defaults.headers.post['Content-Type'] = ''
            + 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';

        $httpProvider.defaults.transformRequest = function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            return str.join('&');
        }

    })
    .run(function ($rootScope, $log, $location, $http, $q, $window) {

        $rootScope.$log = $log;

        $rootScope.$on("$stateChangeStart", function (event, next, current) {
            $rootScope.error = null;
            console.log("$rootScope.appInitialized ", $rootScope.appInitialized, $rootScope.user);

            $rootScope.windowWidth = $window.outerWidth;
            angular.element($window).bind('resize', function () {
                $rootScope.windowWidth = $window.outerWidth;
                $rootScope.$apply('windowWidth');
            });

            if (!$rootScope.appInitialized) {
                console.log("Initializing App!");
                $rootScope.appInitialized = true;
            }
        });
    });

/*
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
    */