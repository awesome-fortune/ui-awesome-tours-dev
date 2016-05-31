/**
 * Created by fortune on 2016/04/30.
 */
app.controller("EditBusController", function ($state, $scope, $http, CONFIG, BusTypeFactory, $sessionStorage) {
    var vm = this;
    vm.saveEdit = saveEdit;

    vm.bus = $state.params.bus;
    vm.busTypes;
    
    BusTypeFactory.getBusTypes().then(function (busType) {
        vm.busTypes = busType.data;
    });

    function saveEdit(bus) {
        bus.username = $sessionStorage.username;
        $http.put(CONFIG.api_url + '/buses/' +bus.id, bus)
            .success(function (response) {
                $state.go('admin-dashboard.view-buses');
                $scope.$emit('busEdited', true);
            })
            .error(function (error) {
                console.error(error);
            });
    }
});