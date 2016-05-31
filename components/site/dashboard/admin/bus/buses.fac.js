/**
 * Created by fortune on 2016/04/30.
 */
app.factory("BusFactory", function ($http, CONFIG) {
    function getBuses() {
        return $http.get(CONFIG.api_url + '/buses');
    }

    return {
        getBuses: getBuses
    }
});