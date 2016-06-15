/**
 * Created by fortune on 2016/04/24.
 */
app.controller("AddBusTypeController", function ($scope, $http, CONFIG, $sessionStorage, Flash) {
    var vm = this;
    
    vm.addBusType = addBusType;
    $scope.$emit('hideAdminStats', true);
    
    function addBusType(busType) {
        if (typeof busType === 'undefined' || 
            typeof busType.description === 'undefined' || 
            typeof busType.type === 'undefined') 
        {
            errorAlert("Please provide some valid input.");
        } else {
            busType.username = $sessionStorage.username;
            $http.post(CONFIG.api_url + '/bus-types', busType)
                .success(function (response) {
                    $scope.$emit('busTypeAdded', true);
                })
                .error(function (error) {
                    errorAlert(error.message);
                });
         }
    }
    
    function errorAlert(message) {
        var message = message;
        var id = Flash.create('warning', message);
    }
    
});