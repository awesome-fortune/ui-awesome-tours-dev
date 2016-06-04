/**
 * Created by fortune on 2016/04/21.
 */
app.controller("LoginController", function ($scope, $http, CONFIG, $sessionStorage, Flash, $timeout, $state, $localStorage) {
    var vm = this;
    vm.login = login;

    if (typeof $localStorage.adminAuthRequired !== 'undefined') {
        if ($localStorage.adminAuthRequired) {
            errorAlert("Admin credentials required for the restricted area!");
            $timeout(function() {
                delete $localStorage.adminAuthRequired;
            }, 1200);
        }
    }

    if (typeof $localStorage.authRequired !== 'undefined') {
        if ($localStorage.authRequired) {
            errorAlert("You have to login in order to view that page!");
            $timeout(function() {
                delete $localStorage.authRequired;
            }, 1200);
        }
    }

    function login(user) {
        $http.post(CONFIG.api_url + '/tokens', user)
            .success(function (response) {
                $sessionStorage.token = response.token;
                $sessionStorage.username = user.username;

                successAlert(response.message);

                $timeout(function() {
                    if (response.message.contains('awesome_admin')) {
                        $state.go('admin-dashboard');
                    } else {
                        $state.go('dashboard');
                    }
                }, 3000);
            })
            .error(function (error, status) {
                switch (status) {
                    case 401:
                        errorAlert("Bad Credentials");
                        delete $sessionStorage.username;
                        delete $sessionStorage.token;
                        break;
                    case 404:
                        var message = 'Sorry, we could not find any account matching that username, please sign up if you ' +
                            'don\'t have an account.';
                        errorAlert(message);
                        delete $sessionStorage.username;
                        delete $sessionStorage.token;
                        break;
                }

            });
    }

    function successAlert(message) {
        var message = message;
        var id = Flash.create('success', message);
    }

    function errorAlert(message) {
        var message = message;
        var id = Flash.create('warning', message);
    }

});