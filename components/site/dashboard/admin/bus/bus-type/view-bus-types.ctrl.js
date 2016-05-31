/**
 * Created by fortune on 2016/04/25.
 */
app.controller("ViewBusTypesController", function ($scope, $state, $http, CONFIG, BusTypeFactory, ngDialog, NgTableParams) {

    var vm = this;
    vm.busTypes;
    vm.busTypesTableParams;
    
    vm.editBusType = editBusType;
    vm.deleteBusType = deleteBusType;
    vm.confirmDelete = confirmDelete;
    
    populateBusTypeList();
    
    function editBusType(busType) {
        $state.go('admin-dashboard.edit-bus-type', {
            id: busType.id,
            busType: busType
        });
    }

    function confirmDelete(busType) {
        $scope.busType = busType;
        ngDialog.open({
            template: 'confirmBusTypeDeleteDialog',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: false
        });
    }
    
    function deleteBusType(id) {
        $http.delete(CONFIG.api_url + '/bus-types/' + id)
            .success(function (response) {
                $scope.$emit('busTypeDeleted', true);
            })
            .error(function (error) {
                console.error(error);
            });
        ngDialog.close();
    }

    function populateBusTypeList() {
        BusTypeFactory.getBusTypes().then(function (busType) {
            vm.busTypes = busType.data;
            vm.busTypesTableParams = new NgTableParams({
                count: 7
            }, {
                data: busType.data
            });
        });    
    }

    $scope.$on('updateBusTypeList', function (event, busAdded) {
        populateBusTypeList();
    });

    $scope.$emit('hideAdminStats', true);
});