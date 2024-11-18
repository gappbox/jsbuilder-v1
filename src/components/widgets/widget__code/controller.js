export default class WidgetCodeController {
    constructor($rootScope, $Interface, $sce, $timeout, ApiGitHub) {
        this.$rootScope = $rootScope;
        this.$Interface = $Interface;
        this.$sce = $sce;
        this.$timeout = $timeout;
        this.ApiGitHub = ApiGitHub;

        this.PageData = {
            code: null,
            codeName: null,
            demo: '',
            type: 'code',
            iframeIsLoaded: null
        };

        this.render();
        this.watchers();
    }

    /**
     * Render code
     */
    render() {

    }

    /**
     * Watchers
     */
    watchers() {
        this.$rootScope.$on('widget:demo', (event, path) => {
            if (this.PageData.type !== 'demo') {
                this.PageData.iframeIsLoaded = true;
            }

            this.PageData.type = 'demo';
            this.PageData.demo = this.$sce.trustAsResourceUrl(path);
        });

        this.$rootScope.$on('widget:control', () => {
            this.PageData.type = 'code';
            this.PageData.code = this.$Interface.getCode(this.PageData.codeName || 'JS');
        });

        this.$rootScope.$on('tab:codeName', (event, codeName) => {
            this.PageData.type = 'code';
            this.PageData.codeName = codeName;
            this.PageData.code = this.$Interface.getCode(this.PageData.codeName);
        })
    }

    /**
     * Callback call when iframe was loadeds
     */
    iframeLoadedCallBack() {
        this.$timeout(() => { this.PageData.iframeIsLoaded = false }, 1000);
        console.log('Iframe is Loaded');
    }
}

WidgetCodeController.$inject = ['$rootScope', '$Interface', '$sce', '$timeout', 'ApiGitHub'];