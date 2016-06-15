/**
 * Created by fortune on 2016/04/30.
 */
app.controller("AddBusController", function ($scope, BusTypeFactory, $http, CONFIG, $sessionStorage, Flash) {
    var vm = this;
    vm.addBus = addBus;
    vm.busTypes;

    BusTypeFactory.getBusTypes().then(function (busType) {
        vm.busTypes = busType.data;
    });


    function addBus(bus) {

        if (typeof  bus === 'undefined' ||
            typeof  bus.busType === 'undefined' ||
            typeof  bus.busRegistration === 'undefined' ||
            typeof  bus.numberOfSeats === 'undefined')
        {
            errorAlert("Please provide some valid input.");
        } else {
            if (isNaN(bus.numberOfSeats)) {
                errorAlert("Please provide a digit for the number of seats field.");
            } else {
                bus.username = $sessionStorage.username;
                $http.post(CONFIG.api_url + '/buses', bus)
                    .success(function (response) {
                        $scope.$emit('busAdded', true);
                    })
                    .error(function (error) {
                        errorAlert(error.message);
                    });
            }
        }
    }

    function errorAlert(message) {
        var message = message;
        var id = Flash.create('warning', message);
    }

    $scope.$emit('hideAdminStats', true);

});