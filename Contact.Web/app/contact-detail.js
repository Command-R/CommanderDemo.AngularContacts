angular.module("app").controller("contactDetail", [
    "$state", "api",
    function ($state, api) {
        var vm = this;

        vm.id = parseInt($state.params.id);
        vm.contact = null;

        api.GetContact({ Id: vm.id }).then(function (contact) {
            vm.contact = contact;
        });

        vm.canDelete = function() {
            return vm.contact.Id > 0;
        };

        vm.canSave = function() {
            return true;
        };

        vm.delete = function() {
            alert(vm.contact.Id);
        };

        vm.save = function() {
            alert(JSON.stringify(vm.contact));
        };

        return vm;
    }
]);