angular.module('app')
    .controller('GridCtrl', ['$scope', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                {field: 'id', displayName: 'Id'},
                {field: 'name', displayName: 'Name'},
                {name: 'edit', displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edit</button> '}
              ],
            data:[
                {
                    'id':1,
                    'name':'test001'
                },
                {
                    'id':2,
                    'name':'test002'
                },
                {
                    'id':3,
                    'name':'test003'
                },
                {
                    'id':4,
                    'name':'test004'
                }
            ]   
        };

    }]);