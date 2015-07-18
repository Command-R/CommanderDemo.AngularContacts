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

        $urlRouterProvider
            .otherwise("/contacts");

        $stateProvider.state("login", {
            url: "/login",
            templateUrl: "/app/login.html"
        });

        $stateProvider.state("contacts", {
            url: "/contacts",
            templateUrl: "/app/contacts.html",
            'abstract': true,
            resolve: { authenticate: authenticate }
        });

        $stateProvider.state("contacts.noselection", {
            url: "",
            templateUrl: "/app/no-selection.html",
            resolve: { authenticate: authenticate }
        });

        $stateProvider.state("contacts.detail", {
            url: "/:id",
            templateUrl: "/app/contact-detail.html",
            resolve: { authenticate: authenticate }
        });

        $stateProvider.state("users", {
            url: "/users",
            templateUrl: "/app/users.html",
            resolve: { authenticate: authenticate }
        });
    }
]);
