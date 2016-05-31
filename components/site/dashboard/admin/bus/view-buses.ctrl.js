/**
 * Created by fortune on 2016/04/30.
 */
app.controller("ViewBusesController", function ($scope, $state, $http, CONFIG, BusFactory, ngDialog, NgTableParams, $sessionStorage) {
    var vm = this;
    vm.buses;

    vm.editBus = editBus;
    vm.deleteBus = deleteBus;
    vm.confirmDelete = confirmDelete;

    vm.busTableParams;

    populateBusList();

    function editBus(bus) {
        $state.go('admin-dashboard.edit-bus', {
            id: bus.id,
            bus: bus
        });
    }

    function deleteBus(id) {
        $http.delete(CONFIG.api_url + '/buses/' + id)
            .success(function (response) {
                $scope.$emit('busDeleted', true);
            })
            .error(function (error) {
                console.error(error);
            });
        ngDialog.close();
    }

    function confirmDelete(bus) {
        $scope.bus = bus;
        ngDialog.open({
            template: 'confirmBusDeleteDialog',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: false
        });
    }

    function populateBusList() {
        BusFactory.getBuses().then(function (bus) {
            vm.buses = bus.data;

            vm.busTableParams = new NgTableParams({
                count: 7
            }, {
                data: bus.data
            });
        });
    }

    $scope.$on('updateBusList', function (event, message) {
        populateBusList();
    });

    $scope.$emit('hideAdminStats', true);
});
