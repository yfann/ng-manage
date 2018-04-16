'use strict';

app.controller('CustomFormCtrl', ['$scope', 'mockService',
    function ($scope, mockService) {
        $scope.post = function () {
            mockService.get('sex_list').then(function (data) {
                console.log(data);
            });
        };
    }]);