var app = angular.module("app", ["ui.router", "ui.bootstrap"]);

app.config([
    "$locationProvider",
    function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }
]);

app.config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

        var authenticate = [
            function () { return true; }
        ];

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        $urlRouterProvider
            .otherwise("/");

        $stateProvider.state("home", {
            url: "/",
            templateUrl: "/app/app.html"
        });

        $stateProvider.state("login", {
            url: "/login",
            templateUrl: "/app/login.html"
        });
    }
]);
