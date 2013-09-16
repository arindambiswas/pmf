'use strict';

angular.module('pmfApp')
    .controller('ExecutionCtrl', function ($scope) {

        $scope.myData = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
        ];

        var hgtOpts = { minHeight: 500 };
        $scope.gridOne = {
            data: 'myData',
            showSelectionCheckbox: true,
            plugins: [new ngGridFlexibleHeightPlugin()]
        };

        $scope.gridTwo = {
            data: 'myData',
            plugins: [new ngGridFlexibleHeightPlugin()]
        };

        $scope.my_data = [
            {
                label: 'Languages',
                children: ['Jade', 'Less', 'Coffeescript']
            },
            {
                label: 'Languages',
                children: [
                    {label: 'Ashish', children: ['Jade', 'Less', 'Coffeescript']},
                    'Less',
                    'Coffeescript'
                ]
            }
        ]
    });
