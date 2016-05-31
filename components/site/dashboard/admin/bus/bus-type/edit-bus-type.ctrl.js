/**
 * Created by fortune on 2016/04/30.
 */
app.controller("EditBusTypesController", function ($state, $scope, $http, CONFIG, ngDialog, $sessionStorage) {
    var vm = this;
    vm.saveEdit = saveEdit;

    vm.busType = $state.params.busType;
    
    function confirmEditSave() {
        
    }
    
    function saveEdit(busType) {
        busType.username = $sessionStorage.username;
        $http.put(CONFIG.api_url + '/bus-types/' +busType.id, busType)
            .success(function (response) {
                $state.go('admin-dashboard.view-bus-types');
                $scope.$emit('busTypeEdited', true);
            })
            .error(function (error) {
                console.error(error);
            });
    }
});