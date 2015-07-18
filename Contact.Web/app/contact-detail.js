angular.module("app").controller("contactDetail", [
    "$state", "api",
    function ($state, api) {
        var vm = this;

        vm.id = parseInt($state.params.id);
        vm.contact = {};

        api.GetContact({ Id: vm.id }).then(function (contact) {
            vm.contact = contact;
        });

        vm.canDelete = function () {
            return vm.contact.Id > 0;
        };

        vm.canSave = function () {
            return true;
        };

        vm.delete = function () {
            api.DeleteContact({ Id: vm.contact.Id })
                .then(function () {
                    $state.go("contacts.noselection");
                }, function(error) {
                    alert(error.message);
                });
        };

        vm.save = function () {
            api.SaveContact(vm.contact)
                .then(function () {
                    $state.go("contacts.noselection");
                }, function (error) {
                    alert(error.message);
                });
        };

        return vm;
    }
]);
