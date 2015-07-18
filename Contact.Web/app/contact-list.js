angular.module("app").controller("contactList", [
    "$state", "api",
    function ($state, api) {
        var vm = this;

        vm.selectedId = parseInt($state.params.id);
        vm.contacts = [];

        api.QueryContacts().then(function (contacts) {
            vm.contacts = contacts;
        });

        vm.select = function (contactId) {
            vm.selectedId = contactId;
        };

        return vm;
    }
]);
