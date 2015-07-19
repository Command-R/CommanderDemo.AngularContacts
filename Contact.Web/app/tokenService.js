angular.module("app").factory("tokenService", [
    "$rootScope",
    function ($rootScope) {
        var self = this;

        self.isAuthenticated = function () {
            return !!self.getToken();
        };

        self.setToken = function (token) {
            sessionStorage.setItem("token", token);
            $rootScope.$broadcast("login");
        };

        self.getToken = function () {
            return sessionStorage.getItem("token");
        };

        self.removeToken = function () {
            sessionStorage.removeItem("token");
            $rootScope.$broadcast("logout");
        };

        return self;
    }
]);

//REF: http://chstrongjavablog.blogspot.com/2013/09/creating-global-http-error-handler-for.html
angular.module("app").config([
    "$httpProvider",
    function ($httpProvider) {
        $httpProvider.interceptors.push([
            "$q", "tokenService",
            function ($q, tokenService) {
                return {
                    'request': function (config) {

                        var token = tokenService.getToken();

                        if (!config.headers) config.headers = {};
                        if (!config.headers.Authentication && token) {
                            config.headers.Authentication = "Bearer " + token;
                        }

                        return config || $q.when(config);
                    }
                };
            }
        ]);
    }
]);

angular.module("app").run([
    "$rootScope", "$state", "tokenService",
    function ($rootScope, $state, tokenService) {
        $rootScope.$on("$locationChangeSuccess", function (event, newUrl) {
            if (!endsWith(newUrl, "/login") && !tokenService.isAuthenticated()) {
                $state.go("login");
            }
        });

        function endsWith(str, suffix) {
            return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
    }
]);
