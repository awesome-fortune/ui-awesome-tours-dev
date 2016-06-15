/**
 * Created by fortune on 2016/04/30.
 */
// TODO: Remove improv admin firewall
app.controller("AdminDashboardController", function ($http, CONFIG, $scope, $state, BusFactory, $timeout, BusRoutesFactory, TripsFactory, $sessionStorage, $localStorage, UserFactory) {
   var vm = this;
    vm.username = $sessionStorage.username;
    //the best improv admin firewall ever... (0_0)
    if (typeof $sessionStorage.username === 'undefined') {
        $state.go('login');
        $localStorage.adminAuthRequired = true;
    }
    if ($sessionStorage.username.localeCompare('awesome_admin') != 0) {
        $state.go('login');
        $localStorage.adminAuthRequired = true;
    }
    
    var buses;
    var busRoutes;
    var trips;
    var users;

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
    
    vm.reloadAdminDashboard = reloadAdminDashboard;
    function reloadAdminDashboard() {
        $state.go('admin-dashboard');
        $timeout(function () {
            $state.reload();
        }, 600);
    }
    vm.totalBuses;
    vm.totalBusRoutes;
    vm.totalTrips;
    vm.totalUsers;
    vm.ticketsSold;
    
    vm.showBusAddedNotification = false;
    vm.showBusDeletedNotification = false;
    vm.showBusEditedNotification = false;
    
    vm.showBusTypeAddedNotification = false;
    vm.showBusTypeDeletedNotification = false;
    vm.showBusTypeEditedNotification = false;
    
    vm.showBusRouteAddedNotification = false;
    vm.showBusRouteDeletedNotification = false;
    vm.showBusRouteEditedNotification = false;

    vm.showTripAddedNotification = false;
    vm.showTripDeletedNotification = false;
    vm.showTripEditedNotification = false;

    vm.showBusRegistrationExistsNotification = false;
    vm.showBusTypeExistsNotification = false;
    vm.showUserDeletedNotification = false;

    vm.showAdminStats = true;

    (function getTripTableLogs() {
        var user = {
            username: $sessionStorage.username
        };
        $http.post(CONFIG.api_url + '/trip-logs', user)
            .success(function (response) {
                vm.ticketsSold = response.length;
            })
            .error(function (error) {
                console.log(error);
            });
    })();

    BusFactory.getBuses().then(function (bus) {
       buses = bus.data;
       vm.totalBuses = buses.length;
    });
    
    BusRoutesFactory.getBusRoutes().then(function (busRoute) {
        busRoutes = busRoute.data;
        vm.totalBusRoutes = busRoutes.length;
    });
    
    TripsFactory.getTrips().then(function (trip) {
        trips = trip.data;
        vm.totalTrips = trips.length;
    });
    
    UserFactory.getUsers().then(function (user) {
        users = user.data;
        vm.totalUsers = users.length;
    });

    $scope.$on('busAdded', function (event, busAdded) {
        vm.totalBuses++;
        vm.showBusAddedNotification = true;

        $timeout(function() {
            vm.showBusAddedNotification = false;
        }, 3000);

    });

    $scope.$on('busDeleted', function (event, busADeleted) {
        vm.totalBuses--;
        vm.showBusDeletedNotification = true;

        $timeout(function() {
            vm.showBusDeletedNotification = false;
            $scope.$broadcast('updateBusList', true); //Letting the ViewBusesController that the bus list has been updated
        }, 1200);
    });

    $scope.$on('busEdited', function (event, busEdited) {
        vm.showBusEditedNotification = true;

        $timeout(function() {
            vm.showBusEditedNotification = false;
        }, 3000);

    });

    $scope.$on('busTypeAdded', function (event, busTypeAdded) {
        vm.showBusTypeAddedNotification = true;

        $timeout(function() {
            vm.showBusTypeAddedNotification = false;
        }, 3000);

    });

    $scope.$on('busTypeDeleted', function (event, busTypeDeleted) {
        
        vm.showBusTypeDeletedNotification = true;

        $timeout(function() {
            vm.showBusTypeDeletedNotification = false;
            $scope.$broadcast('updateBusTypeList', true);
        }, 1200);
    });

    $scope.$on('busTypeEdited', function (event, busTypeEdited) {
        vm.showBusTypeEditedNotification = true;

        $timeout(function() {
            vm.showBusTypeEditedNotification = false;
        }, 3000);

    });

    $scope.$on('busRouteAdded', function (event, busRouteAdded) {
        vm.totalBusRoutes++;
        vm.showBusRouteAddedNotification = true;

        $timeout(function() {
            vm.showBusRouteAddedNotification = false;
        }, 3000);

    });

    $scope.$on('userDeleted', function (event, userDeleted) {
        vm.totalUsers--;
        vm.showUserDeletedNotification = true;

        $timeout(function() {
            vm.showUserDeletedNotification = false;
            $scope.$broadcast('updateUserList', true);
        }, 1200);
    });
    
    $scope.$on('busRouteDeleted', function (event, busRouteDeleted) {
        vm.totalBusRoutes--;
        vm.showBusRouteDeletedNotification = true;

        $timeout(function() {
            vm.showBusRouteDeletedNotification = false;
            $scope.$broadcast('updateBusRouteList', true);
        }, 1200);
    });

    $scope.$on('busRouteEdited', function (event, busRouteEdited) {
        vm.showBusRouteEditedNotification = true;

        $timeout(function() {
            vm.showBusRouteEditedNotification = false;
        }, 3000);

    });

    $scope.$on('tripAdded', function (event, tripAdded) {
        vm.totalTrips++;
        vm.showTripAddedNotification = true;

        $timeout(function() {
            vm.showTripAddedNotification = false;
        }, 3000);

    });

    $scope.$on('tripDeleted', function (event, tripDeleted) {
        vm.totalTrips--;
        vm.showTripDeletedNotification = true;

        $timeout(function() {
            vm.showTripDeletedNotification = false;
            $scope.$broadcast('updateTripList', true);
        }, 1200);
    });

    $scope.$on('tripEdited', function (event, tripEdited) {
        vm.showTripEditedNotification = true;

        $timeout(function() {
            vm.showTripEditedNotification = false;
        }, 3000);

    });

    $scope.$on('busAlreadyExists', function (event, message) {
        vm.showBusRegistrationExistsNotification = true;

        $timeout(function() {
            vm.showBusRegistrationExistsNotification = false;
        }, 3000);

    });

    $scope.$on('busTypeAlreadyExists', function (event, message) {
        vm.showBusTypeExistsNotification = true;

        $timeout(function() {
            vm.showBusTypeExistsNotification = false;
        }, 3000);

    });

    $scope.$on('hideTicketsTable', function (event, message) {
        vm.hideTicketsTable = false;
    });

    $scope.$on('hideAdminStats', function (event, message) {
        vm.showAdminStats = false;
    });
    
});