/**
 * Created by fortune on 2016/04/30.
 */
app.factory("BusRoutesFactory", function ($http, CONFIG) {
    function getBusRoutes() {
        return $http.get(CONFIG.api_url + '/bus-routes');
    }

    return {
        getBusRoutes: getBusRoutes
    }
});