angular.module('httpService', []).
    service('mockService', ['$q', '$timeout', '$http', '$state', 
    function ($q, $timeout, $http, $state) {
        this.post = function (url, params) {
            var deferred = $q.defer();
            url = "/data" + url + ".json";
            //view.loading();
            $http.post(url, params).then(function (result) {
                var data = result.data;
                if (result.status == 0) {
                    deferred.resolve(data);
                } else {
                    switch (result.status) {
                        default:
                            // view.alert(result.msg);
                            //$state.go("login");
                            deferred.reject(result);
                    }
                }
            }, function (x) {
                //view.close_loading();
                deferred.reject(T("msg.system_error"));
            });

            return deferred.promise;
        };
    }]);