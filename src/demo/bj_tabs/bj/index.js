/*
 * jQuery tab content plugin
 */
;(function($, window, exportName) {
    'use strict';

    var Tabs = function(options) {
        this.options = $.extend({}, Tabs.DEFAULTS, options);
        this.init();
    };

    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch || /Windows Phone/.test(navigator.userAgent);

    // default options
    Tabs.DEFAULTS = {
        tabItems: 'li',
        tabLink: 'a',
        attrb: 'href',
        activeClass: 'active',
        hiddenClass: 'tab-hidden',
        eventMode: 'click',
        collapsedTab: false,
        checkHash: false,

        // callbacks
        onInit: null,
        onChange: null,
        onShow: null,
        onHide: null,
        onDestroy: null
    };

    Tabs.prototype = {
        init: function() {
            if (this.options.tabset) {
                this.initStructure();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        initStructure: function() {
            this.tabset = $(this.options.tabset);
            this.tabs = $();
            this.tabItems = this.tabset.children(this.options.tabItems);
            this.tabLinks = this.tabItems.children(this.options.tabLink);
            this.currentIndex = 0;
            this.eventMode = isTouchDevice ? 'click' : this.options.eventMode;
            this.handleLocationHash();
            this.groupmentTabs();
        },
        attachEvents: function() {
            var self = this;

            // event handler
            this.onSwitchTab = function(event) {
                var link = $(this);
                var item = link.closest(self.options.tabItems);
                event.preventDefault();
                self.switchTab(item);
            };

            this.tabLinks.on(this.options.eventMode, this.onSwitchTab);
        },
        switchTab: function(item) {
            var itemActive = this.getActiveItem();

            if (this.isActiveItem(item)) {
                if (this.options.collapsedTab) {
                    this.hideTab(item);
                }
            } else {
                this.showTab(item);
                this.hideTab(itemActive);
            }

            this.makeCallback('onChange', this, item);
        },
        showTab: function(item) {
            item.addClass(this.options.activeClass);
            this.getTargetTab(item).removeClass(this.options.hiddenClass);
            this.makeCallback('onShow', this, item);
        },
        hideTab: function(item) {
            item.removeClass(this.options.activeClass);
            this.getTargetTab(item).addClass(this.options.hiddenClass);
            this.makeCallback('onHide', this, item);
        },
        nextTab: function() {
            var index = this.getActiveItem().index();
            this.currentIndex = index < this.tabItems.length - 1 ? index + 1 : 0;
            this.switchTab(this.tabItems.eq(this.currentIndex));
        },
        prevTab: function() {
            var index = this.getActiveItem().index();
            this.currentIndex = index > 0 ? index - 1 : this.tabItems.length - 1;
            this.switchTab(this.tabItems.eq(this.currentIndex));
        },
        numTab: function(num) {
            if (this.currentIndex !== num && num <= this.tabItems.length - 1) {
                this.currentIndex = num;
                this.currentItem = this.tabItems.eq(this.currentIndex);
                this.switchTab(this.currentItem);
            }
        },
        groupmentTabs: function() {
            var self = this;

            this.tabLinks.each(function() {
                var link = $(this);
                var item = link.closest(self.options.tabItems);
                var href = link.attr(self.options.attrb);
                var tab;
                href = href.substr(href.lastIndexOf('#'));
                tab = $(href).addClass(self.options.hiddenClass);
                self.tabs = self.tabs.add(tab);
                self.visibleActiveTab(item, tab, href);
            });
        },
        visibleActiveTab: function(item, tab, href) {
            if (item.hasClass(this.options.activeClass) || (this.options.checkHash && location.hash === href)){
                this.showTab(item);
            }
        },
        handleLocationHash: function() {
            if (this.options.checkHash && this.tabLinks.filter('[' + this.options.attrb + '="' + location.hash + '"]').length) {
                this.tabItems.removeClass(this.options.activeClass);
                setTimeout(function() {
                    window.scrollTo(0, 0);
                }, 1);
            }
        },
        isActiveItem: function(item) {
            return item.hasClass(this.options.activeClass);
        },
        getActiveItem: function() {
            return this.tabItems.siblings('.' + this.options.activeClass);
        },
        getTargetTab: function(item) {
            var link = item.find(this.options.tabLink);
            return $(link.attr(this.options.attrb));
        },
        destroy: function() {
            var self = this;

            this.makeCallback('onDestroy', this);
            this.tabset.removeData('Tabs');
            this.tabItems.removeClass(this.options.activeClass);
            this.tabLinks.off(this.options.eventMode, this.onSwitchTab);
            this.tabLinks.each(function() {
                var link = $(this);
                var tab = $(link.attr(self.options.attrb));

                tab.removeClass(self.options.hiddenClass);
            });
        },
        makeCallback: function(name) {
            var args;

            if ($.isFunction(this.options[name])) {
                args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);
                this.options[name].apply(this, args);
            }
        }
    };

    // jQuery plugin interface
    $.fn.tabs = function(options) {
        return this.each(function() {
            var elements = $(this);
            var instance = elements.data('Tabs');
            var settings;

            if (!instance) {
                settings = $.extend({}, options, { tabset: this });
                elements.data('Tabs', new Tabs(settings));
            }
        });
    };

    // export module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Tabs;
    } else {
        window[exportName] = Tabs;
    }
}(jQuery, window, 'Tabs'));