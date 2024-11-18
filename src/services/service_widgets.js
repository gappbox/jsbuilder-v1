import { angular, _ } from 'vendors';
import { widgets } from '../__temp__/widgets';

export default class ServiceWidget {
    constructor($rootScope, $http, toastr, $filter, $timeout, ApiGitHub) {
        const _this = this;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.toastr = toastr;
        this.$filter = $filter;
        this.$timeout = $timeout;
        this.ApiGitHub = ApiGitHub;

        this.widgets = widgets.items;
        this.activeIdWidget = null;

        this.$rootScope.isLoading = true;

        function test() {
            return _this.createPaths().map((item) => {
                var temp = [];
                var files = _this.widgets[item.id].Files;

                if (files.length && files.indexOf('html') > -1) {
                    temp.push({
                        name: 'Html',
                        path: `demo/bj_${item.id}/bj/index.html`
                    });
                }
                if (files.length && files.indexOf('js') > -1) {
                    temp.push({
                        name: 'Plugin',
                        path: `demo/bj_${item.id}/bj/index.js`
                    });
                }

                var k = {};

                function promises() {
                    return temp.map((item) => {
                        return _this.loadScript(item.path).then((respon) => {
                            k[item.name] = respon.data;
                        });
                    });
                }

                Promise.all(promises()).then(() => {
                    for (var key in k) {
                        _this.widgets[item.id][key] = k[key];
                    }
                });
            });
        }

        Promise.all(test()).then(() => {
            this.$timeout(() => {this.$rootScope.isLoading = false}, 100);
            console.log('All Scripts have loaded successfully!');
        });
    }

    createPaths() {
        let widgets = this.getList();
        let id;
        let path;
        let paths = [];

        for (let key in widgets) {
            id = widgets[key].Id;
            path = `demo/bj_${id}`;
            paths.push({ id, path });
        }

        return paths;
    }

    /**
     * Get widget list
     * @returns {Object} Return the widget list
     */
    getList() {
        return this.widgets;
    }

    /**
     * Get active id widget
     * @returns {string} key - Widget Key
     */
    getActiveIdWidget() {
        return this.activeIdWidget;
    }

    /**
     * Set active id widget
     * @param {string} key - Widget Key
     */
    setActiveIdWidget(key) {
        this.activeIdWidget = key;
    }

    /**
     * Ajax load scripts from folders
     * @returns {Object} Return promise
     */
    loadScript(path) {
        return this.$http.get(path);
    }

    /**
     * Turn on widget
     * @param {string} key - Widget Key
     */
    turnOn(key) {
        if (!this.widgets[key].IsChecked) {
             this.widgets[key].IsChecked = true;
             this.turnOnDependency(key);
             this.fillConfig(key);
             this.$rootScope.$emit('widget:control');
        }
    }

    /**
     * Turn on dependency widget
     * @param {string} key - Widget Key
     */
    turnOnDependency(key) {
        let dependency = this.widgets[key].Dependency;

        if (dependency && Array.isArray(dependency) && dependency.length) {
            _.forEach(dependency, (widgetId) => {
                this.turnOn(widgetId);
            });
        }
    }

    /**
     * Turn off widget
     * @param {string} key - Widget Key
     */
    turnOff(key) {
        if (this.widgets[key].IsChecked) {
            this.widgets[key].IsChecked = false;
            this.clearConfig(key);
            this.$rootScope.$emit('widget:control')
        }
    }

    /**
     * Fill installed default options
     * @param {string} key - Widget Key
     */
    fillConfig(key) {
        let config = {
            id: Date.now(),
            options  : angular.copy(this.widgets[key].Options),
            callbacks: angular.copy(this.widgets[key].Callbacks)
        };

        let propsDefaultDisplay = this.widgets[key].Structure && this.widgets[key].Structure.DefaultDisplay || [];
        let prop;

        for (prop in config.options) {
            if (propsDefaultDisplay.indexOf(prop) > -1) {
                config.options[prop].display = true;
            }
        }

        if (this.widgets[key].Installed) {
            this.widgets[key].Installed.push(config);
        }
    }

    /**
     * Remove config
     * @param {string} key - Widget Key
     * @param {string} propId - Property id of current config widget
     */
    removeConfig(key, propId) {
        for (let i = 0, max = this.widgets[key].Installed.length; i < max; i++) {
            if (this.widgets[key].Installed[i].id === propId) {
                this.widgets[key].Installed.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Clear installed default options
     * @param {string} key - Widget Key
     */
    clearConfig(key) {
        if (this.widgets[key].Installed) {
            this.widgets[key].Installed = [];
        }
    }

    /**
     * Reset code preview
     */
    resetCodePreview() {
        let widgets = this.getList();

        _.forEach(widgets, (widget, key) => {
            this.turnOff(key);
        });

        this.toastr.success(this.$filter('translate')('MESSAGE_RESET'));
    }
}

ServiceWidget.$inject = ['$rootScope', '$http', 'toastr', '$filter', '$timeout', 'ApiGitHub'];