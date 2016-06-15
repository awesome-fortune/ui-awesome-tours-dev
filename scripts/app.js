/**
 * Created by fortune on 2016/04/21.
 */
var app = angular.module('awesomeTours', [
    'ui.router',
    'ngAnimate',
    'anim-in-out',
    'ng-fx',
    'angular-loading-bar',
    'ngStorage',
    'ngDialog',
    'ngTable',
    'ngFlash'
]);

app.constant('CONFIG', {
    api_url: 'http://localhost:8000'
});

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.authorization = {};
    //$httpProvider.interceptors.push('AuthInterceptor'); -- TODO:// Fix CORS issue caused by this line --
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: 'components/authentication/signup/signup.tpl.html',
            controller: 'SignUpController as vm'
        })
        .state('home', {
            url: '/',
            templateUrl: 'components/site/home/home.tpl.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'components/authentication/login/login.tpl.html',
            controller: 'LoginController as vm'
        })
        .state('dashboard', {
            url: '/home',
            templateUrl: 'components/site/dashboard/user/dashboard.tpl.html',
            controller: 'UserDashboardController as vm'
        })
        .state('dashboard.user-profile', {
            url: '/user-profile',
            templateUrl: 'components/site/dashboard/user/profile/views/user-profile.tpl.html',
            controller: 'UserProfileController as vm'
        })

        // bus admin
        .state('admin-dashboard', {
            url: '/admin',
            templateUrl: 'components/site/dashboard/admin/dashboard.tpl.html',
            controller: 'AdminDashboardController as vm'
        })
        .state('admin-dashboard.admin-profile', {
            url: '/profile',
            templateUrl: 'components/site/dashboard/admin/profile/views/profile.tpl.html',
            controller: 'AdminProfileController as vm'
        })
        .state('admin-dashboard.user-list', {
            url: '/user-list',
            templateUrl: 'components/site/dashboard/admin/users/views/users.tpl.html',
            controller: 'UserListController as vm'
        })
        .state('admin-dashboard.admin-logs', {
            url: '/logs',
            templateUrl: 'components/site/dashboard/admin/logs/views/logs.tpl.html',
            controller: 'AdminLogsController as vm'
        })
        .state('admin-dashboard.add-bus', {
            url: '/add-bus',
            templateUrl: 'components/site/dashboard/admin/bus/views/add-bus.tpl.html',
            controller: 'AddBusController as vm'
        })
        .state('admin-dashboard.edit-bus', {
            url: '/edit-bus/:id',
            templateUrl: 'components/site/dashboard/admin/bus/views/edit-bus.tpl.html',
            controller: 'EditBusController as vm',
            params: {
                bus: null
            }
        })
        .state('admin-dashboard.add-bus-type', {
            url: '/add-bus-type',
            templateUrl: 'components/site/dashboard/admin/bus/bus-type/views/add-bus-type.tpl.html',
            controller: 'AddBusTypeController as vm'
        })
        .state('admin-dashboard.view-buses', {
            url: '/view-buses',
            templateUrl: 'components/site/dashboard/admin/bus/views/view-buses.tpl.html',
            controller: 'ViewBusesController as vm'
        })
        .state('admin-dashboard.view-bus-types', {
            url: '/view-bus-types',
            templateUrl: 'components/site/dashboard/admin/bus/bus-type/views/view-bus-types.tpl.html',
            controller: 'ViewBusTypesController as vm'
        })
        .state('admin-dashboard.edit-bus-type', {
            url: '/edit-bus-type/:id',
            templateUrl: 'components/site/dashboard/admin/bus/bus-type/views/edit-bus-type.tpl.html',
            controller: 'EditBusTypesController as vm',
            params: {
                busType: null
            }
        })
            
        // Route admin;
        .state('admin-dashboard.add-route', {
            url: '/add-route', 
            templateUrl: 'components/site/dashboard/admin/route/views/add-route.tpl.html',
            controller: 'AddBusRouteController as vm'
        })
        .state('admin-dashboard.view-routes', {
            url: '/view-routes',
            templateUrl: 'components/site/dashboard/admin/route/views/view-routes.tpl.html',
            controller: 'ViewBusRoutesController as vm'
        })
        .state('admin-dashboard.edit-bus-route', {
            url: '/edit-route/:id',
            templateUrl: 'components/site/dashboard/admin/route/views/edit-route.tpl.html',
            controller: 'EditBusRouteController as vm',
            params: {
                busRoute: null
            }
        })

        // Trip Admin
        .state('admin-dashboard.view-trips', {
            url: '/view-trips',
            templateUrl: 'components/site/dashboard/admin/trip/views/view-trips.tpl.html',
            controller: 'ViewTripsController as vm'
        })
        .state('admin-dashboard.add-trip', {
            url: '/add-trip',
            templateUrl: 'components/site/dashboard/admin/trip/views/add-trip.tpl.html',
            controller: 'AddTripController as vm'
        })
});

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div style="border: none; margin-left: -15%; margin-top: -15%" class="loading">' +
                        '<img src="images/camera-loader.gif" width="30" height="30" />' +
                  '</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});

/*
 * We'll use this factory to intercept all requests and place the bearer token for our request, this is good
 * when we need to authenticate ourselves on the API
 */
app.factory('AuthInterceptor', function ($rootScope, $q, $localStorage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }

            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // We are unauthenticated
            }

            return response || $q.when(response);
        }
    }
});