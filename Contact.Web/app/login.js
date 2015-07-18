angular.module("app").controller("loginCtrl", [
    "$state", "api",
   function ($state, api) {
       var vm = this;
       vm.user = {};

       vm.authenticate = function() {
           return api.login(vm.user, function () {
               $state.go("contacts");
           }, function (err) {
               alert("Login Failed: " + err.message);
           });
       }

       return vm;
   }
]);
