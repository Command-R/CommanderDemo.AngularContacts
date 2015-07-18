angular.module("app").controller("contactList", [
    "$rootScope", "$state", "api",
    function ($rootScope, $state, api) {
        var vm = this;

        vm.selectedId = parseInt($state.params.id);
        vm.contacts = { Items: [] };

        $rootScope.$on("$viewContentLoading", function (event, viewConfig) {
            if (viewConfig.view.self.name === "contacts.noselection") {
                vm.load();
            }
        });

        vm.load = function() {
            api.QueryContacts().then(function (contacts) {
                vm.contacts = contacts;
            });
        }

        vm.select = function (contactId) {
            vm.selectedId = contactId;
        };

        vm.load();
        return vm;
    }
]);
