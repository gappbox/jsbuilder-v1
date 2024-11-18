import { app } from 'vendors';
import template from './template';

export default app.directive('ngSelect', () => {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            value: '=',
            valueList: '='
        },
        template: template,
        controller: ['$scope', function($scope) {
            const vm = $scope;

            vm.isOpened = false;

            vm.selectOption = (option) => {
                vm.value = option;
                vm.toggle();
            };

            vm.toggle = () => {
                vm.isOpened = !vm.isOpened;
            };
        }],
        link: function (scope, element, attrb) {}
    }
});