/**
 * Created by fortune on 2016/05/02.
 */
app.controller("ViewTripsController", function ($scope, $state, $http, CONFIG, TripsFactory, BusFactory, BusRoutesFactory, ngDialog, NgTableParams) {
    var vm = this;
    vm.trips;
    vm.buses;
    vm.busRoutes;
    vm.tripsTableParams;
    
    vm.deleteTrip = deleteTrip;
    vm.getBusRegistration = getBusRegistration;
    vm.confirmDelete = confirmDelete;
    
    BusFactory.getBuses().then(function (bus) {
        vm.buses = bus.data;
    });
    
    BusRoutesFactory.getBusRoutes().then(function (busRoute) {
        vm.busRoutes = busRoute.data;
    });
    
    populateTripList();

    function confirmDelete(trip) {
        $scope.trip = trip;
        ngDialog.open({
            template: 'confirmTripDeleteDialog',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: false
        });
    }
    
    function deleteTrip(id) {
        $http.delete(CONFIG.api_url + '/trips/' + id)
            .success(function (response) {
                $scope.$emit('tripDeleted', true);
            })
            .error(function (error) {
                console.error(error);
            });
        ngDialog.close();
    }

    /**
     * 
     * @param bus - The bus ID
     * @returns The bus registration that will be pulled from the BusFactory for a bus based on the
     * bus ID that was passed in.
     */
    function getBusRegistration(bus) {
        var busRegistration;
        
        for (var i = 0; i < vm.trips.length; i++) {
            var busObj = vm.buses[i];
            
            if(busObj.id == bus) {
                busRegistration = busObj.busRegistration;
                break;
            }
        }
        
        return busRegistration;
    }
    
    function populateTripList() {
        TripsFactory.getTrips().then(function (trip) {
            vm.trips = trip.data;
            vm.tripsTableParams = new NgTableParams({
                count: 7
            }, {
                data: trip.data
            });
        });
    }

    $scope.$on('updateTripList', function (event, message) {
        populateTripList();
    });

    $scope.$emit('hideAdminStats', true);
});