/**
 * Created by fortune on 2016/06/01.
 */
app.controller("UserProfileController", function ($scope, CONFIG, $http, $sessionStorage, NgTableParams) {
    var vm = this;
    vm.userData;
    vm.totalTickets;
    vm.tripTableParams;
    
    (function getUserData() {
        $http.get(CONFIG.api_url + '/users/' + $sessionStorage.username)
            .success(function (response) {
                vm.userData = response;
            })
            .error(function (error) {
                console.log(error);
            });
    })();

    (function getTripTableLogs() {
        var user = {
            username: $sessionStorage.username
        };
        $http.post(CONFIG.api_url + '/user-trip-logs', user)
            .success(function (response) {
                var total = 0;
                for (var i = 0; i < response.length; i++) {
                        total++;
                }
                vm.totalTickets = total;
                vm.tripTableParams = new NgTableParams({
                    count: 7
                }, {
                    data: response
                });
            })
            .error(function (error) {
                console.log(error);
            });
    })();

    $scope.$emit('hideTicketsTable', true);
})