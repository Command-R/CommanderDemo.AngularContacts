angular.module("app").service("api", [
    "$q",
    function ($q) {

        var contacts = [
            { Id: 1, FirstName: "Paul", LastName: "Wheeler", Email: "paul@paulwheeler.com" },
            { Id: 2, FirstName: "Jon", LastName: "Wheeler", Email: "jdwheeler@gmail.com" }
        ];

        return {
            QueryContacts: function () {
                var q = $q.defer();
                q.resolve(contacts);
                return q.promise;
            },
            GetContact: function (params) {
                var q = $q.defer();
                var contact = {};
                angular.forEach(contacts, function(c) {
                    if (c.Id === params.Id) contact = c;
                });
                q.resolve(contact);
                return q.promise;
            }
        };
    }
]);