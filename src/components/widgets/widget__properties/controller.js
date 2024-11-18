export default class WidgetPropertiesController {
    constructor($Widget, $rootScope, toastr, $filter, ApiGitHub) {
        this.$Widget = $Widget;
        this.$rootScope = $rootScope;
        this.toastr = toastr;
        this.$filter = $filter;
        this.ApiGitHub = ApiGitHub;

        this.PageData = {
            widgets : this.$Widget.getList(),
            widgetId: this.$Widget.getActiveIdWidget()
        };

        this.PageData.callbacks = this.PageData.widgets[this.PageData.widgetId].Callbacks;
    }

    /**
     * Add new property of current widget
     */
    onAddProperty() {
        this.$Widget.fillConfig(this.PageData.widgetId);
    }

    /**
     * Change value
     * If default value and current value are different - we display property
     * @param {String} propertyName - Property name of options
     * @param {Object} currentItem
     */
    changeValue(propertyName, currentItem) {
        let defaultDisplay = this.PageData.widgets[this.PageData.widgetId].Structure.DefaultDisplay || [];
        let defaultValue   = this.PageData.widgets[this.PageData.widgetId].Options[propertyName].value;
        let statusDisplay;

        if (defaultValue === currentItem.options[propertyName].value) {
            statusDisplay = false;
        } else {
            statusDisplay = true;
        }

        if (defaultDisplay.indexOf(propertyName) > -1) {
            statusDisplay = true;
        }

        currentItem.options[propertyName].display = statusDisplay;
    }

    /**
     * Remove property
     * @param {string} key - Widget Key
     * @param {string} propId - Property id of current config widget
     */
    onRemoveProperty(key, propId) {
        this.$Widget.removeConfig(key, propId);
    }

    /**
     * Save property of current widget
     * Close popover after update properties
     */
    onSaveProperty() {
        this.$rootScope.$emit('widget:control');
        this.$rootScope.$emit('popover:hide');
        this.toastr.success(this.$filter('translate')('MESSAGE_SAVE'));
    }
}

WidgetPropertiesController.$inject = ['$Widget', '$rootScope', 'toastr', '$filter', 'ApiGitHub'];