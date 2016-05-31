/**
 * Created by fortune on 2016/04/30.
 */
app.controller("AddBusController", function ($scope, BusTypeFactory, $http, CONFIG, $sessionStorage) {
    var vm = this;
    vm.addBus = addBus;
    vm.busTypes;

    BusTypeFactory.getBusTypes().then(function (busType) {
        vm.busTypes = busType.data;
    });


    function addBus(bus) {

        $http.post(CONFIG.api_url + '/check/bus-registration-existence', bus)
            .success(function (response) {
                if (response.busRegistrationExists) {
                    $scope.$emit('busAlreadyExists', true);
                } else {
                    bus.username = $sessionStorage.username;
                    $http.post(CONFIG.api_url + '/buses', bus)
                        .success(function (response) {
                            $scope.$emit('busAdded', true);
                        })
                        .error(function (error) {
                            console.error(error);
                        });
                }
            })
            .error(function (error) {
                console.error(error);
            });
    }

    $scope.$emit('hideAdminStats', true);

});