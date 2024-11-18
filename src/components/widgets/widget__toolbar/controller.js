import { _, zip, FileSaver } from 'vendors';

export default class WidgetToolbarController {
    constructor($Widget, $Interface, $rootScope, clipboard, toastr, $filter) {
        this.$Widget = $Widget;
        this.$Interface = $Interface;
        this.$rootScope = $rootScope;
        this.clipboard = clipboard;
        this.toastr = toastr;
        this.$filter = $filter;

        this.PageData = {
            tabs: ['JS', 'Html'],
            tabActive: 0,
            oneOfWidgetSelected: false
        };

        this.watchers();
    }

    /**
     * Watchers
     */
    watchers() {
        this.$rootScope.$on('widget:demo', () => {
            this.PageData.tabActive = null;
        });

        this.$rootScope.$on('widget:control', () => {
            const widgets = this.$Widget.getList();
            this.PageData.oneOfWidgetSelected = _.some(widgets, ['IsChecked', true]) ? true : false;

            if (!this.PageData.oneOfWidgetSelected || this.PageData.tabActive === null) {
                this.onUserChangeTab(0);
            }
        });
    }

    /**
     * Change active tab
     * @param {Number} indexTab - Number of tab
     */
    onUserChangeTab(indexTab) {
        let codeName;

        if (this.PageData.tabActive !== indexTab) {
            this.PageData.tabActive = indexTab;
            codeName = this.PageData.tabs[indexTab];
            this.$rootScope.$emit('tab:codeName', codeName);
        }
    }

    /**
     * Copy code to clipboard
     */
    onUserCopyToClipboard() {
        let codeName = this.PageData.tabs[this.PageData.tabActive];
        let code = this.$Interface.getCode(codeName);

        if (this.clipboard.supported) {
            this.clipboard.copyText(code);
        }
    }

    /**
     * Generate ZIP archive and downaload project
     */
    onUserDownloadProject() {
        const codeJs = this.$Interface.getCode('JS');
        const codeHtml = this.$Interface.getCode('Html');
        const codeCss = this.$Interface.getCode('Css');

        zip.files = {};
        zip.file('index.html', codeHtml);
        zip.folder('js').file('jquery.main.js', codeJs);
        zip.folder('css').file('plugins.css', codeCss);
        zip.generateAsync({type:"blob"}).then(function (blob) {
            FileSaver.saveAs(blob, "Project.zip");
        });
    }

    /**
     * Reset code preview
     */
    onUserResetCodePreview() {
        this.$Widget.resetCodePreview();
        this.onUserChangeTab(0);
    }

    /**
     * Success callback on copy
     */
    onCopySuccess() {
        let codeName = this.PageData.tabs[this.PageData.tabActive];
        this.toastr.success(this.$filter('translate')('MESSAGE_COPY'));
    }

    /**
     * Fail callback on copy
     */
    onCopyFail() {
        this.toastr.error('', 'Error Copy');
    }
}

WidgetToolbarController.$inject = ['$Widget', '$Interface', '$rootScope', 'clipboard', 'toastr', '$filter'];