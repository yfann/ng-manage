app.controller('MsgCtrl', ['$scope', function($scope) {
    $scope.alert=function(){
        view.alert(T("警告"));
    };
}]);