/**
 * Created by fortune on 2016/04/26.
 */
app.factory("BusTypeFactory", function ($http, CONFIG) {

    function getBusTypes() {
        return $http.get(CONFIG.api_url + '/bus-types');
    }

    return {
        getBusTypes: getBusTypes
    }
});