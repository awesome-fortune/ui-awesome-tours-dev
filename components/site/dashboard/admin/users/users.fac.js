/**
 * Created by fortune on 2016/06/14.
 */
app.factory("UserFactory", function ($http, CONFIG) {
    function getUsers() {
        return $http.get(CONFIG.api_url + '/users');
    }
    
    return {
        getUsers: getUsers
    }
});