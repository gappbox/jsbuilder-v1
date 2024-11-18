import { app } from 'vendors';
import template from './template';
import './styles';

export default app.component('widgetSearch', {
    bindings: {
        search: '='
    },
    template: template,
});