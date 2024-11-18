import { app } from 'vendors';
import WidgetToolbarController from './controller';
import template from './template';
import './styles';

export default app.component('widgetToolbar', {
    template: template,
    controller: WidgetToolbarController
});