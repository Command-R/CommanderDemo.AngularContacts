angular.module("app").controller("login", [
    "$state", "api", "tokenService",
   function ($state, api, tokenService) {
       var vm = this;
       vm.user = {};

       vm.authenticate = function() {
           return api.LoginUser(vm.user)
               .then(function(token) {
                   tokenService.setToken(token);
                   $state.go("contacts.noselection");
               }, function(error) {
                   alert("Login Failed: " + error.message);
               });
       }

       return vm;
   }
]);
