/**
 * Created by fortune on 2016/05/22.
 */
app.controller("AdminLogsController", function ($scope, NgTableParams, CONFIG, $http, $sessionStorage) {
    var vm = this;
    vm.busTableParams;
    $scope.$emit('hideAdminStats', true);

    getBusTableLogs();

    function getBusTableLogs() {
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
    }

});