/**
 * Created by fortune on 2016/06/14.
 */
app.controller("UserListController", function ($scope, NgTableParams, UserFactory, CONFIG, ngDialog, $http) {
    var vm = this;
    vm.users;
    vm.userTableParams;

    vm.deleteUser = deleteUser;
    vm.confirmDelete = confirmDelete;

    populateUserList();

    function confirmDelete(user) {
        $scope.user = user;
        ngDialog.open({
            template: 'confirmUserDeleteDialog',
            className: 'ngdialog-theme-default',
            scope: $scope,
            overlay: false
        });
    }

    function deleteUser(id) {
        $http.delete(CONFIG.api_url + '/users/' + id)
            .success(function (response) {
                $scope.$emit('userDeleted', true);
            })
            .error(function (error) {
                console.error(error);
            });
        ngDialog.close();
    }

    $scope.$emit('hideAdminStats', true);

    function populateUserList() {
        UserFactory.getUsers().then(function (user) {
            vm.users = user.data;
            vm.userTableParams = new NgTableParams({
                count: 7
            }, {
                data: user.data
            });
        });
    }

    $scope.$on('updateUserList', function (event, message) {
        populateUserList();
    });
});