/**
 * Created by fortune on 2016/06/01.
 */
app.controller("UserProfileController", function ($scope, CONFIG, $http, $sessionStorage) {
    var vm = this;
    vm.userData;
    
    (function getUserData() {
        $http.get(CONFIG.api_url + '/users/' + $sessionStorage.username)
            .success(function (response) {
                vm.userData = response;
            })
            .error(function (error) {
                console.log(error);
            });
    })();
})