/**
 * Created by fortune on 2016/05/02.
 */
app.controller("AddTripController", function ($scope, BusFactory, $http, CONFIG, BusRoutesFactory, $sessionStorage, Flash) {
    var vm = this;

    vm.addTrip = addTrip;
    vm.buses;
    vm.busRoutes;
    
    BusFactory.getBuses().then(function (bus) {
        vm.buses = bus.data;
    });

    BusRoutesFactory.getBusRoutes().then(function (busRoute) {
        vm.busRoutes = busRoute.data;
    });
    
    
    function addTrip(trip) {

        if (typeof trip === 'undefined' ||
            typeof trip.bus === 'undefined' ||
            typeof trip.fare === 'undefined' ||
            typeof trip.route === 'undefined' ||
            typeof trip.tripName === 'undefined') {
            errorAlert("Please provide some valid input.");
        } else {
            /**
             * Data coming from the SELECT input comes through as a string but we need
             * an integer, so we simply convert the string into an integer.
             *
             */
            trip.route = parseInt(trip.route);
            trip.bus = parseInt(trip.bus);
            trip.username = $sessionStorage.username;
            /**
             * We want the number of seats from the BusFactory so we'll pass in a bus ID and
             * retrieve the corresponding number of seats that the bus has based on the bus ID.
             */
            for (var i =0; i < vm.buses.length; i++) {
                var busObj = vm.buses[i];

                if(busObj.id == trip.bus) {
                    trip.seats = busObj.seats;
                    break;
                }
            }

            $http.post(CONFIG.api_url + '/trips', trip)
                .success(function (response) {
                    $scope.$emit('tripAdded', response);
                })
                .error(function (error) {
                    errorAlert(error.message);
                });
        }
    }

    function errorAlert(message) {
        var message = message;
        var id = Flash.create('warning', message);
    }

    $scope.$emit('hideAdminStats', true);
    
});