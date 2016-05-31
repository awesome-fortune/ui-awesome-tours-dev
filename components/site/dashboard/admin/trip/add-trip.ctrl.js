/**
 * Created by fortune on 2016/05/02.
 */
app.controller("AddTripController", function ($scope, BusFactory, $http, CONFIG, BusRoutesFactory, $sessionStorage) {
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

        $http.post(CONFIG.api_url + '/trip', trip)
            .success(function (response) {
                $scope.$emit('tripAdded', response);
            })
            .error(function (error) {
                console.error(error);
            });
        
    }

    $scope.$emit('hideAdminStats', true);
    
});