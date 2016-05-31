/**
 * Created by fortune on 2016/04/24.
 */
app.controller("AddBusTypeController", function ($scope, $http, CONFIG, $sessionStorage) {
    var vm = this;
    
    vm.addBusType = addBusType;
    
    function addBusType(busType) {
        busType.username = $sessionStorage.username;
        $http.post(CONFIG.api_url + '/check/bus-type-existence', busType)
            .success(function (response) {
                if (response.busTypeExists) {
                    $scope.$emit('busTypeAlreadyExists', true);
                } else {
                    $http.post(CONFIG.api_url + '/bus-types', busType)
                        .success(function (response) {
                            $scope.$emit('busTypeAdded', true);
                        })
                        .error(function (error) {
                            console.error(error);
                        });     
                }
            })
            .error(function (error) {
                console.log(error);
            });
    }

    $scope.$emit('hideAdminStats', true);
});