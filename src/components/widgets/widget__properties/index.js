import { app } from 'vendors';
import WidgetPropertiesController from './controller';
import template from './template';
import './styles';

export default app.component('widgetProperties', {
    template: template,
    controller: WidgetPropertiesController
})