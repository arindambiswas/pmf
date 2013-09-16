'use strict';

angular.module('pmfApp')
    .controller('NavigationCtrl', ['$scope', '$location', '$rootScope', '$http',
        function ($scope, $location, $rootScope, $http) {

            $scope.isAnythingLoading = function() {
                return $http.pendingRequests.length > 0;
            };

            $scope.showLoader = false;
            $scope.user = $rootScope.user;

            $scope.getClass = function(path) {
                if ($location.path().substr(0, path.length) == path) {
                    return "active"
                } else {
                    return ""
                }
            }
        }]);
