/**
 * Created by fortune on 2016/04/30.
 */
app.controller("AddBusRouteController", function ($scope, BusFactory, $http, CONFIG, $sessionStorage) {
    var vm = this;
    
    vm.addBusRoute = addBusRoute;
    vm.buses;
    
    BusFactory.getBuses().then(function (bus) {
        vm.buses = bus.data;
    });
    
    function addBusRoute(busRoute) {
        busRoute.username = $sessionStorage.username;
        $http.post(CONFIG.api_url + '/bus-routes', busRoute)
            .success(function (response) {
                $scope.$emit('busRouteAdded', true);
            })
            .error(function (error) {
                console.error(error);
            });
    }

    $scope.$emit('hideAdminStats', true);

});