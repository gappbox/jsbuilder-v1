import { app } from 'vendors';
import PageHeaderController from './controller';
import './styles';
import template from './template';

export default app.component('pageHeader', {
    template: template,
    controller: PageHeaderController
});