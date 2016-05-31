/**
 * Created by fortune on 2016/05/01.
 */
app.controller("ViewBusRoutesController", function ($scope, $state, $http, CONFIG, BusRoutesFactory, ngDialog, NgTableParams) {
    var vm = this;
    vm.busRoutes;
    vm.busRoutesTableParams;
    
    vm.editBusRoute = editBusRoute;
    vm.deleteBusRoute = deleteBusRoute;
    vm.confirmDelete = confirmDelete;
    
    populateBusRouteList();

    function editBusRoute(busRoute) {
        $state.go('admin-dashboard.edit-bus-route', {
            id: busRoute.id,
            busRoute: busRoute
        });
    }
    
    function confirmDelete(busRoute) {
        $scope.busRoute = busRoute;
        ngDialog.open({
            template: 'confirmBusRoutesDeleteDialog',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: false
        });   
    }
    
    function deleteBusRoute(id) {
        $http.delete(CONFIG.api_url + '/bus-routes/' + id)
            .success(function (response) {
                $scope.$emit('busRouteDeleted', true);
            })
            .error(function (error) {
                console.error(error);
            });
    }

    function populateBusRouteList() {
        BusRoutesFactory.getBusRoutes().then(function (busRoute) {
            vm.busRoutes = busRoute.data;
            vm.busRoutesTableParams = new NgTableParams({
                count: 7
            }, {
                data: busRoute.data
            });
        });
    }

    $scope.$on('updateBusRouteList', function (event, message) {
        populateBusRouteList();
    });

    $scope.$emit('hideAdminStats', true);
});
