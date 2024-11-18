import { app } from 'vendors';
import WidgetListController from './controller';
import template from './template';
import './styles';

export default app.component('widgetList', {
    bindings: {
        search: '='
    },
    template: template,
    controller: WidgetListController
}).filter('cFilter', ['$filter', function($filter) {
    return function(items, search) {
        if (!search) {
            return items;
        }

        if (!search || '' === search) {
            return items;
        }

        return items.filter(element => $filter('translate')(element.Title).toLowerCase().indexOf(search.toLowerCase()) > -1);
    };
}]);