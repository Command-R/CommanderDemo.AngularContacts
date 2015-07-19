angular.module("app").controller("nav", [
    "$rootScope", "$state", "tokenService",
    function($rootScope, $state, tokenService) {
        var vm = this;

        vm.isAuthenticated = tokenService.isAuthenticated();

        $rootScope.$on("login", function() {
            vm.isAuthenticated = tokenService.isAuthenticated();
        });

        vm.logout = function() {
            tokenService.removeToken();
            vm.isAuthenticated = false;
            $state.go("login");
        };

        return vm;
    }
]);