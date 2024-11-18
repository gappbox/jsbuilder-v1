import { app } from 'vendors';
import WidgetCodeController from './controller';
import template from './template';
import './styles';

export default app.component('widgetCode', {
    template: template,
    controller: WidgetCodeController
}).directive('iframeOnload', [function(){
    return {
        scope: {
            callBack: '&iframeOnload'
        },
        link: function(scope, element, attrs){
            element.on('load', function(){
                return scope.callBack();
            })
        }
    }}]);