/**
 * Created by fortune on 2016/05/22.
 */
app.controller("AdminLogsController", function ($scope, NgTableParams, CONFIG, $http, $sessionStorage) {
    var vm = this;
    vm.busTableParams;
    vm.userTableParams;
    vm.tripTableParams;
    vm.busRouteTableParams;
    $scope.$emit('hideAdminStats', true);
    
    (function getBusRouteTableLogs() {
        var user = {
            username: $sessionStorage.username
        };
        $http.post(CONFIG.api_url + '/bus-route-logs', user)
            .success(function (response) {
                vm.busRouteTableParams = new NgTableParams({
                    count: 7,
                    sorting: { timestamp: 'desc'}
                }, {
                    data: response
                });
            })
            .error(function (error) {
                console.log(error);
            });
    })();

    (function getTripTableLogs() {
        var user = {
            username: $sessionStorage.username
        };
        $http.post(CONFIG.api_url + '/trip-logs', user)
            .success(function (response) {
                vm.tripTableParams = new NgTableParams({
                    count: 7,
                    sorting: { timestamp: 'desc'}
                }, {
                    data: response
                });
            })
            .error(function (error) {
                console.log(error);
            });
    })();

    (function getUserTableLogs() {
        var user = {
            username: $sessionStorage.username
        };
        $http.post(CONFIG.api_url + '/user-logs', user)
            .success(function (response) {
                vm.userTableParams = new NgTableParams({
                    count: 7,
                    sorting: { timestamp: 'desc'}
                }, {
                    data: response
                });
            })
            .error(function (error) {
                console.log(error);
            });
    })();
    
    (function getBusTableLogs() {
        var user = {
            username: $sessionStorage.username
        };
        $http.post(CONFIG.api_url + '/bus-logs', user)
            .success(function (response) {
                vm.busTableParams = new NgTableParams({
                    count: 7,
                    sorting: { timestamp: 'desc'}
                }, {
                    data: response
                });
            })
            .error(function (error) {
                console.log(error);
            });
    })();

});