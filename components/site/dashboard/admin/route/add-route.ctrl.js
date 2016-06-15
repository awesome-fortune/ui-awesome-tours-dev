/**
 * Created by fortune on 2016/04/30.
 */
app.controller("AddBusRouteController", function ($scope, BusFactory, $http, CONFIG, $sessionStorage, Flash) {
    var vm = this;
    
    vm.addBusRoute = addBusRoute;
    vm.buses;
    
    BusFactory.getBuses().then(function (bus) {
        vm.buses = bus.data;
    });
    
    function addBusRoute(busRoute) {

        if (typeof  busRoute === 'undefined' ||
            typeof  busRoute.routeName === 'undefined' ||
            typeof  busRoute.destination === 'undefined' ||
            typeof  busRoute.departureLocation === 'undefined')
        {
            errorAlert("Please provide some valid input.");
        } else {
            busRoute.username = $sessionStorage.username;
            $http.post(CONFIG.api_url + '/bus-routes', busRoute)
                .success(function (response) {
                    $scope.$emit('busRouteAdded', true);
                })
                .error(function (error) {
                    errorAlert(error.message)
                });
        }
    }

    function errorAlert(message) {
        var message = message;
        var id = Flash.create('warning', message);
    }
    
    $scope.$emit('hideAdminStats', true);
});