/**
 * Created by fortune on 2016/04/21.
 */
app.controller("SignUpController", function ($scope, $http, CONFIG, Flash, $sessionStorage) {
    var vm = this;

    vm.signUp = signUp;

    function signUp(user) {
        $http.post(CONFIG.api_url + '/users', user)
            .success(function (response) {
                if (response.errors.length === 0) {
                    successAlert(response.message);

                    // Log the user in
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
                        .error(function (error) {
                            console.log(error);
                        });

                } else {
                    var tempString = "";
                    for (var i=0; i < response.errors.length; i++) {
                        tempString += "<li><strong>"+ response.errors[i] +"</strong></li>";
                    }
                    errorAlert(response.message + "<ul>" + tempString + "</ul>");
                }
            })
            .error(function (error) {
                console.log(error)
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