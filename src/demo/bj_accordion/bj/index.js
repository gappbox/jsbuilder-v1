/*
 * jQuery Accordion Plugin
 */
;(function($, window, exportName) {
    'use strict';

    var Accordion = function(options) {
        this.options = $.extend({}, Accordion.DEFAULTS, options);
        this.init();
    };

    Accordion.DEFAULTS = {
        items: '.item',
        opener: '.opener',
        slider: '.slider',
        activeClass: 'active',
        collapse: true,
        redirect: false,
        animDuration: 350,

        // callbacks
        onInit: null,
        onBeforeShow: null,
        onBeforeHide: null,
        onAfterShow: null,
        onAfterHide: null,
        onDestroy: null
    };

    Accordion.prototype = {
        init: function() {
            if (this.options.holder) {
                this.initStructure();
                this.attachEvents();
                this.makeCallback('onInit', this);
            }
        },
        initStructure: function() {
            this.accordion = $(this.options.holder);
            this.items = this.accordion.find(':has(' + this.options.slider + ')');
        },
        attachEvents: function() {
            var self = this;

            this.onCollaspedSlide = function(event) {
                var link = $(this);
                var item = link.closest(self.options.items);

                self.collapsedSlide(item);
                event.preventDefault();
            };

            this.accordion.on('click', this.options.opener, this.onCollaspedSlide);
        },
        collapsedSlide: function(item) {
            var activeItem = this.fetchActiveItem(item);

            if (item.hasClass(this.options.activeClass)) {
                if (this.options.redirect) {
                    location.href = this.fetchRedirectURL(item);
                    return;
                }

                if (this.options.collapse) {
                    this.hideSlide(item);
                }
            } else {
                this.showSlide(item);
                this.hideSlide(activeItem);
            }
        },
        showSlide: function(item, isAnim) {
            var slide = this.fetchSlide(item);

            item.addClass(this.options.activeClass);

            slide.stop(true).slideDown(isAnim ? 0 : this.options.animDuration);
            slide.promise().done($.proxy(function() {
                slide.css('height', '');
                this.makeCallback('onAfterShow', this, item, slide);
            }, this));

            this.makeCallback('onBeforeShow', this, item, slide);
        },
        hideSlide: function(item, isAnim) {
            var slide = this.fetchSlide(item);

            item.removeClass(this.options.activeClass);

            slide.stop(true).slideUp(isAnim ? 0 : this.options.animDuration);
            slide.promise().done($.proxy(function() {
                this.makeCallback('onAfterHide', this, item, slide);
            }, this));

            this.makeCallback('onBeforeHide', this, item, slide);
        },
        fetchSlide: function(item) {
            return item.children(this.options.slider);
        },
        fetchActiveItem: function(item) {
            return item.siblings('.' + this.options.activeClass);
        },
        fetchRedirectURL: function(item) {
            return item.find(this.options.opener).attr('href');
        },
        destroy: function() {
            this.accordion.find(':has(' + this.options.slider + ')').removeClass(this.options.activeClass);
            this.accordion.find(this.options.slider).removeAttr('style');
            this.accordion.off('click', this.options.opener, this.onCollaspedSlide);
            this.accordion.removeData('Accordion');
            this.makeCallback('onDestroy', this);
        },
        makeCallback: function(name) {
            var args;

            if ($.isFunction(this.options[name])) {
                args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);
                this.options[name].apply(this, args);
            }
        }
    }

    $.fn.accordion = function(options) {
        return this.each(function() {
            var elements = $(this);
            var instance = elements.data('Accordion');
            var settings;

            if (!instance) {
                settings = $.extend({}, options, { holder: this });
                elements.data('Accordion', new Accordion(settings));
            }
        });
    };

    // export module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Accordion;
    } else {
        window[exportName] = Accordion;
    }
}(jQuery, this, 'Accordion'));