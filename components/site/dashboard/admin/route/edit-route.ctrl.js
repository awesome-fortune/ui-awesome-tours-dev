/**
 * Created by fortune on 2016/05/02.
 */
app.controller("EditBusRouteController", function ($state, $scope, $http, CONFIG, BusRoutesFactory, $sessionStorage) {
    var vm = this;
    vm.saveEdit = saveEdit;

    vm.busRoute = $state.params.busRoute;
    vm.busRoutes;

    BusRoutesFactory.getBusRoutes().then(function (busRoute) {
        vm.busRoutes = busRoute.data;
    });

    function saveEdit(busRoute) {
        busRoute.username = $sessionStorage.username;
        $http.put(CONFIG.api_url + '/bus-routes/' +busRoute.id, busRoute)
            .success(function (response) {
                $state.go('admin-dashboard.view-routes');
                $scope.$emit('busRouteEdited', true);
            })
            .error(function (error) {
                console.error(error);
            });
    }
});