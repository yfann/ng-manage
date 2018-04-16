angular.module('httpService', []).
    service('mockService', ['$q', '$timeout', '$http', '$state', 
    function ($q, $timeout, $http, $state) {
        this.get = function (url, params) {
            var deferred = $q.defer();
            url = "/mock_data/" + url + ".json";
            //view.loading();
            $http.get(url).then(function (result) {
                var d = result.data;
                if (d.status == 0) {
                    deferred.resolve(d.data);
                } else {
                    switch (d.status) {
                        default:
                            // view.alert(result.msg);
                            //$state.go("login");
                            deferred.reject(d);
                    }
                }
            }, function (x) {
                //view.close_loading();
                deferred.reject(T("msg.system_error"));
            });

            return deferred.promise;
        };
    }]);