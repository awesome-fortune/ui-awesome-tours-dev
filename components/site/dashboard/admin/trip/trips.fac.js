/**
 * Created by fortune on 2016/05/02.
 */
app.factory("TripsFactory", function ($http, CONFIG) {
    function getTrips() {
        return $http.get(CONFIG.api_url + '/trips');
    }

    return {
        getTrips: getTrips
    }
});