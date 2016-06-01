/**
 * Created by fortune on 2016/06/01.
 */
app.controller("UserDashboardController", function (ngDialog, NgTableParams, $scope, $http, CONFIG, TripsFactory, $sessionStorage, $state, $localStorage) {
    var vm = this;
    vm.username = $sessionStorage.username;
    vm.trips;
    vm.confirmPurchase = confirmPurchase;
    vm.purchaseTicket = purchaseTicket;

    populateTripList();
    
    //the best improv admin firewall ever... (0_0)
    if (typeof $sessionStorage.username === 'undefined') {
        $state.go('login');
        $localStorage.authRequired = true;
    }

    vm.logout = logout;
    function logout() {
        var user = { username: $sessionStorage.username }
        $http.post(CONFIG.api_url + '/logout', user)
            .success(function (response) {
                delete $sessionStorage.username;
                delete $sessionStorage.token;
                $state.go('home');
            })
            .error(function (error) {
                console.log(error);
            });
    }

    function confirmPurchase(trip) {
        $scope.trip = trip;
        ngDialog.open({
            template: 'confirmTripDeleteDialog',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: false
        });
    }

    function purchaseTicket(id) {
        var trip = {
            id: id,
            username: $sessionStorage.username
        };
        $http.put(CONFIG.api_url + '/trips/' + id, trip)
            .success(function (response) {
                console.log(response);
            })
            .error(function (error) {
                console.log(error);
            });
        ngDialog.close();
        $state.reload();
    }

    function populateTripList() {
        TripsFactory.getTrips().then(function (trip) {
            vm.trips = trip.data;
            vm.tripsTableParams = new NgTableParams({
                count: 7
            }, {
                data: trip.data
            });
        });
    }

});