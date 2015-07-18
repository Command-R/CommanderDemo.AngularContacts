angular.module("app").service("jsonRpc", [
    "$http", "$q",
    function ($http, $q) {

        return {
            send: send
        };

        function send(method, params) {
            var q = $q.defer();
            var config = {};

            var request = {
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: guid()
            };

            if (!request.method) throw "jsonRpc.js Request ERROR: method name required";
            if (!request.params) request.params = {};

            $http.post("/jsonrpc/" + request.method, request, config)
                .then(function(response) {
                    if (response.data.error) {
                        q.reject(response.data.error);
                    } else {
                        q.resolve(response.data.result);
                    }
                }, function(error) {
                    q.reject(error);
                });

            return q.promise;
        }

        //REF: http://stackoverflow.com/a/2117523
        function guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
]);
