import { _ } from 'vendors';

export default class WidgetListController {
    constructor($rootScope, $Widget, ApiGitHub) {
        this.$rootScope = $rootScope;
        this.$Widget = $Widget;
        this.ApiGitHub = ApiGitHub;

        this.PageData = {
            widgetsStructure: {},
            widgets: {}
        };

        this.render();
    }

    /**
     * Render widgets list
     */
    render() {
        this.PageData.widgetsStructure = this.createWidgetStructure();
        this.PageData.widgets = this.$Widget.getList();
    }

    /**
     * Create widget structure for render on aside
     * @returns {Object}
     */
    createWidgetStructure() {
        const widgets = this.$Widget.getList();

        return _.reduce(widgets, (result, value, key) => {
            (result[value.Category] || (result[value.Category] = [])).push({
                Id: key,
                Title: value.Title
            });

            return result;
        }, {});
    }

    /**
     * Turn on widget
     * @param {String} key - Widget Key
     */
    turnOn(key) {
        this.$Widget.turnOn(key);
    }

    /**
     * Turn off widget
     * @param {String} key - Widget Key
     */
    turnOff(key) {
        this.$Widget.turnOff(key);
    }

    /**
     * Show popover window properties for widget
     * @param {String} key - Widget Key
     */
    showProperties(key) {
        this.$Widget.setActiveIdWidget(key);
    }

    /**
     * Set demo widget
     * @param {String} key - Widget Key
     */
    setDemo(key) {
        const path = this.ApiGitHub.getDemoPath(key);
        this.$rootScope.$emit('widget:demo', path);
    }
}

WidgetListController.$inject = ['$rootScope', '$Widget', 'ApiGitHub'];