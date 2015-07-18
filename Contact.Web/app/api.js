angular.module("app").service("api", [
    "jsonRpc",
    function (jsonRpc) {
        var self = {};
        self.DeleteContact = function(params) {
            return jsonRpc.send("DeleteContact", params);
        };
        self.GetContact = function(params) {
            return jsonRpc.send("GetContact", params);
        };
        self.QueryContacts = function(params) {
            return jsonRpc.send("QueryContacts", params);
        };
        self.SaveContact = function(params) {
            return jsonRpc.send("SaveContact", params);
        };
        self.DeleteUser = function(params) {
            return jsonRpc.send("DeleteUser", params);
        };
        self.GetUser = function(params) {
            return jsonRpc.send("GetUser", params);
        };
        self.QueryUsers = function(params) {
            return jsonRpc.send("QueryUsers", params);
        };
        self.SaveUser = function(params) {
            return jsonRpc.send("SaveUser", params);
        };
        return self;
    }
]);
