angular.module('app')
    .controller('GridCtrl', ['$scope', function ($scope) {
        $scope.gridData = [
            { 
                'firstName': 'abc', 
                'lastName': 'tt',
                'age':18,
                'gender':'male'
            },
            { 
                'firstName': 'abc1', 
                'lastName': 'tt',
                'age':18,
                'gender':'male'
            },
            { 
                'firstName': 'abc2', 
                'lastName': 'tt',
                'age':18,
                'gender':'male'
            },
            { 
                'firstName': 'abc3', 
                'lastName': 'tt',
                'age':18,
                'gender':'male'
            },
            { 
                'firstName': 'abc4', 
                'lastName': 'tt',
                'age':18,
                'gender':'male'
            },
            { 
                'firstName': 'abc5', 
                'lastName': 'tt',
                'age':18,
                'gender':'male'
            }
        ];

    }]);