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

        $urlRouterProvider
            .otherwise("/login");

        $stateProvider.state("login", {
            url: "/login",
            templateUrl: "/app/login.html"
        });

        $stateProvider.state("contacts", {
            url: "/contacts",
            templateUrl: "/app/contacts.html",
            'abstract': true
        });

        $stateProvider.state("contacts.noselection", {
            url: "",
            templateUrl: "/app/no-selection.html"
        });

        $stateProvider.state("contacts.detail", {
            url: "/:id",
            templateUrl: "/app/contact-detail.html"
        });

        $stateProvider.state("users", {
            url: "/users",
            templateUrl: "/app/users.html"
        });
    }
]);
