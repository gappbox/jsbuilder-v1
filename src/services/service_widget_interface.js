import { _, prettyJs } from 'vendors';
import { fLower } from 'vendors/utils';

export default class ServiceInterface {
    constructor($Widget) {
        this.$Widget = $Widget;
    }

    /**
     * Get code of current codeName
     * @param {String} codeName - Code name of tab
     * @returns {String} Return formatted code of current codeName
     */
    getCode(codeName) {
        let code;

        switch (codeName) {
            case 'JS':
                code = this.getJavaScript();
                break;

            case 'Html':
                code = this.getHtml();
                break;

            case 'Css':
                code = this.getCss();
                break;

            default: code = '';
        }

        return code;
    }

    /**
     * Generate code structure
     * @returns {String} Return formatted code
     */
    getJavaScript() {
        let initialize = this.getInitJS();
        let configure = this.configure();
        let body = this.getBodyJS();

        return `${initialize} \n\n${configure} \n\n${body}`;
    }

    /**
     * Get initialize code
     * @returns {String} Return initialize code
     */
    getInitJS() {
        let widgets = this.$Widget.getList();
        let widget, key, code = ``, codeJS = ``;

        if (_.every(widgets, (n) => n.IsChecked === false)) {
            return '';
        }

        for (key in widgets) {
            widget = widgets[key];
            if (widgets[key].IsChecked && widget.Installed) {
                codeJS += `\n    init${fLower(key)}();`;
            }
        }

        code += `// page initialize \n`;
        code += `jQuery(function() {`;
        code += `${codeJS}`;
        code += `\n});`;

        return code;
    }

    /**
     * Generate configure code
     * @returns {String} Return configure code
     */
    configure() {
        let widgets = this.$Widget.getList();
        let widget, key, code = ``, config;
        let prettyCode;

        for (key in widgets) {
            widget = widgets[key];

            if (widget.IsChecked && widget.Installed) {
                code += `// init ${fLower(key)} \n`;
                code += `function init${fLower(key)}() {`;

                for (let widgetInstalled in widget.Installed) {
                    let options = widget.Installed[widgetInstalled].options;
                    let selector = options.selector ? options.selector.value : '';
                    let optionsConfigure = {};

                    for (let keyOption in options) {
                        if (keyOption === 'selector' || keyOption === 'responsive' || !options[keyOption].display) continue;

                        optionsConfigure[keyOption] = options[keyOption].value;
                    }

                    // Callbacks
                    if (widget.Callbacks && widget.Callbacks.length) {
                        for (let a = 0; a < widget.Installed[widgetInstalled].callbacks.length; a++) {
                            if (widget.Installed[widgetInstalled].callbacks[a].IsChecked) {
                                optionsConfigure[widget.Installed[widgetInstalled].callbacks[a].Name] = `d function(${widget.Installed[widgetInstalled].callbacks[a].Arguments}) {} d`;
                            }
                        }
                    }

                    config = Object.keys(optionsConfigure).length ? JSON.stringify(optionsConfigure) : '';

                    if (options.responsive && options.responsive.value !== '') {
                        if (!widgets.responsive.IsChecked) {
                             widgets.responsive.IsChecked = true;
                        }

                        code += `ResponsiveHelper.addRange({
                        '${options.responsive.value}': {
                            on: function() {`
                    }

                    if (widget.IsConstructor) {
                        code += `new ${fLower(key)}(${config}); \n`;
                    } else {
                        code += `jQuery("${selector}").${key}(${config}); \n`;
                    }

                    if (options.responsive && options.responsive.value !== '') {
                        code += `},
                            off: function() {
                                jQuery('${selector}').each(function() {
                                    var instance = jQuery(this).data('${fLower(key)}');
                                
                                    if (instance) {
                                        instance.destroy();
                                    }
                                });
                            }
                        }
                    });`
                    }
                }

                code += `} \n\n`;
            }
        }

        prettyCode = prettyJs(code, {
            convertStrings: "single",
            noSpaceAfterFunction: true
        });

        return prettyCode.replace(/\'d/g, '').replace(/d\'/g, '')
    }

    /**
     * Get plugin body code
     * @returns {String} Return plugin body code
     */
    getBodyJS() {
        let widgets = this.$Widget.getList();
        let widget, code = ``;

        for (let key in widgets) {
            widget = widgets[key];
            if (widget.IsChecked) {
                if (widget.Plugin) {
                    code += `${widget.Plugin} \n\n`;
                } else {
                    code += ``;
                }
            }
        }

        return code;
    }

    /**
     * Get html structure
     * @return {String} - Return html structure jquery plugins
     */
    getHtml() {
        let widgets = this.$Widget.getList();
        let widget, html = ``, htmlPlugin = ``;

        if (_.every(widgets, (n) => n.IsChecked === false)) {
            return '';
        }

        for (let key in widgets) {
            widget = widgets[key];
            if (widget.IsChecked && widget.Installed) {
                if (widget.Html) {
                    htmlPlugin += `<!-- ${fLower(key)} structure --> \n`;
                    htmlPlugin += `${widget.Html} \n\n`;
                } else {
                    htmlPlugin += ``;
                }
            }
        }

        html += `<!DOCTYPE html> \n`;
        html += `<html lang="en"> \n`;
        html += `    <head> \n`;
        html += `    <meta charset="utf-8"> \n`;
        html += `    <meta name="viewport" content="width=device-width, initial-scale=1.0"> \n`;
        html += `    <title>Html structure for jQuery plugins</title> \n`;
        html += `    <link media="all" rel="stylesheet" href="css/plugins.css"> \n`;
        html += `    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js" defer></script> \n`;
        html += `    <script src="js/jquery.main.js" defer></script> \n`;
        html += `</head> \n`;
        html += `<body> \n\n`;
        html += `${htmlPlugin}`;
        html += `</body> \n`;
        html += `</html>`;

        return html;
    }

    /**
     * Get css styles
     * @return {String} - Return css styles for jquery plugins
     */
    getCss() {
        let widgets = this.$Widget.getList();
        let widget, css = ``, cssPlugin = ``;

        if (_.every(widgets, (n) => n.IsChecked === false)) {
            return '';
        }

        for (let key in widgets) {
            widget = widgets[key];
            if (widget.IsChecked && widget.Installed) {
                if (widget.Css) {
                    cssPlugin += `/* ${fLower(key)} styles */ \n`;
                    cssPlugin += `${widget.Css} \n\n`;
                } else {
                    cssPlugin += ``;
                }
            }
        }

        css += `${cssPlugin}`;

        return css
    }
}

ServiceInterface.$inject = ['$Widget'];