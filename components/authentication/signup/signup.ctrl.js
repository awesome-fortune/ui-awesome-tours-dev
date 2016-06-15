/**
 * Created by fortune on 2016/04/21.
 */
app.controller("SignUpController", function ($scope, $http, CONFIG, Flash, $sessionStorage, $timeout) {
    var vm = this;

    vm.signUp = signUp;

    function signUp(user) {

        if (typeof user === 'undefined' ||
            typeof user.username === 'undefined' ||
            typeof user.email === 'undefined' ||
            typeof user.firstName === 'undefined' ||
            typeof user.lastName === 'undefined' ||
            typeof user.gender === 'undefined' ||
            typeof user.password === 'undefined')
        {
            if (typeof user.email === 'undefined') {
                errorAlert("Please provide a valid email address");
            } else {
                errorAlert("Please provide some valid input");
                if (typeof user.gender === 'undefined') {
                    errorAlert("Please specify your gender");
                }
            }

        } else {
            $http.post(CONFIG.api_url + '/users', user)
                .success(function (response) {
                    successAlert(response.message);
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
                            }, 60);
                        })
                        .error(function (error) {

                        });
                })
                .error(function (error) {
                    var tempString = "";
                    for (var i=0; i < error.errors.length; i++) {
                        tempString += "<li><strong>"+ error.errors[i] +"</strong></li>";
                    }
                    errorAlert(error.message + "<ul>" + tempString + "</ul>");
                });
        }
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