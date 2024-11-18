import { app, angular } from 'vendors';
import { LangEn, LangRu } from './__temp__/locale';
import { LocalStorage, ServiceWidget, ServiceInterface, ApiGitHub } from './services';
import './assets/styles/main';
import './components';
import './components-ui';

app
    .config(config)
    .service('ApiGitHub', ApiGitHub)
    .service('Storage', LocalStorage)
    .service('$Interface', ServiceInterface)
    .service('$Widget', ServiceWidget);

function config(toastrConfig, $translateProvider) {
    const lang = JSON.parse(window.localStorage.getItem('BJ_Lang')) || 'en';

    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-left',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        timeOut: 2500,
        target: '#wrapper'
    });

    $translateProvider.translations('en', LangEn);
    $translateProvider.translations('ru', LangRu);
    $translateProvider.preferredLanguage(lang);
}

config.$inject = ['toastrConfig', '$translateProvider'];