/**
 * Created by fortune on 2016/04/21.
 */
app.controller("SignUpController", function ($scope, $http, CONFIG, Flash) {
    var vm = this;

    vm.signUp = signUp;

    function signUp(user) {
        $http.post(CONFIG.api_url + '/users', user)
            .success(function (response, status) {
                if (status === 200) {
                    if (response.errors.length === 0) {
                        successAlert(response.message);
                    } else {
                        var tempString = "";
                        for (var i=0; i < response.errors.length; i++) {
                            tempString += "<li><strong>"+ response.errors[i] +"</strong></li>";
                        }
                        errorAlert(response.message + "<ul>" + tempString + "</ul>");
                    }
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