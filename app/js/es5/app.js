"use strict";

;(function (win, doc) {
    'use strict';

    var $body = $("body");
    var $html = $("html");

    var smoothScrollJq = function smoothScrollJq() {
        $("a.js-scrollScreen[href^='#']").click(function (e) {
            e.preventDefault();

            var offsetTop = $($(this).attr("href")).offset().top;
            var position = offsetTop - 20;

            $("body, html").animate({
                scrollTop: position
            });
        });
    };
    var animatedInput = function animatedInput() {
        var input = $(".input.input--line");

        input.focus(function () {
            $(this).addClass("focus");
        });
        input.blur(function () {
            $(this).removeClass("focus");
        });
        input.change(function () {
            if ($(this).val() !== "" && !$(this).hasClass("char")) {
                $(this).addClass("char");
            } else if ($(this).val() === "") {
                $(this).removeClass("char");
            }
        });
    };

    var fixedNavbar = {
        $navbar: $("#fixed-navbar"),
        $pageHero: $("#page-hero"),
        init: function init() {
            if (win.innerWidth >= 1024) {
                var isScrolled = this.$pageHero[0].getBoundingClientRect().bottom <= 0;
                isScrolled ? this.$navbar.removeClass("is-hidden") : this.$navbar.addClass("is-hidden");
            }
        }
    };

    var mobileMenu = {
        $headerPanelMobile: $("#header-panel-mobile"),
        $navbar: $("#header-navbar__nav"),
        $burger: $("#burger"),
        pageToOvh: function pageToOvh() {
            $body.addClass("is-ovh");
            $html.addClass("is-ovh");
        },
        pageRemoveOvh: function pageRemoveOvh() {
            $body.removeClass("is-ovh");
            $html.removeClass("is-ovh");
        },
        panel: function panel() {
            var isActive = this.$headerPanelMobile.hasClass("active");
            if (!isActive) {
                this.$headerPanelMobile.addClass("active");
                this.pageToOvh();
            } else {
                this.$headerPanelMobile.removeClass("active");
                this.pageRemoveOvh();
            }
        },
        navbar: function navbar() {
            var isActive = this.$navbar.hasClass("active");
            if (!isActive) {
                this.$navbar.addClass("active");
                this.$navbar.stop().fadeIn(400);
            } else {
                this.$navbar.removeClass("active");
                this.$navbar.stop().fadeOut(400);
                this.pageRemoveOvh();
            }
        },
        init: function init() {
            var _this = this;

            this.$burger.click(function () {
                _this.panel();
                _this.navbar();
            });
            this.$navbar.on('click', '.header-navbar__link', function () {
                if (win.innerWidth <= 1023) {
                    _this.$headerPanelMobile.removeClass("active");
                    _this.pageRemoveOvh();
                    _this.$navbar.removeClass("active");
                    _this.$navbar.stop().fadeOut(400);
                }
            });
        }
    };

    var Carousel = function Carousel(carousel) {
        this.$carousel = $(carousel);
        this.$next = $(carousel + "-next");
        this.$prev = $(carousel + "-prev");

        this.init = function () {
            var _this2 = this;

            this.$next.click(function () {
                _this2.$carousel.trigger('next.owl.carousel');
            });
            this.$prev.click(function () {
                _this2.$carousel.trigger('prev.owl.carousel');
            });
            this.$carousel.owlCarousel({
                items: 1,
                dots: false,
                nav: false,
                autoplay: false,
                autoHeight: true,
                loop: true,
                margin: 20
            });
        };
    };

    var initCarousels = function initCarousels() {
        new Carousel("#gallery-slider").init();
        new Carousel("#masonry-slider").init();
    };

    var callbackPopup = {
        $trigger: $(".js-callback-toggle"),
        $popup: $("#callback-popup"),
        $overlay: $("#callback-popup-overlay"),
        $closeBtn: $("#callback-popup-close"),
        $delay: 300,
        open: function open() {
            this.$popup.addClass("callback-popup--active");
            this.$overlay.stop().fadeIn(this.delay);
        },

        close: function close() {
            var _this3 = this;

            this.$overlay.stop().fadeOut(100, function () {
                _this3.$popup.removeClass("callback-popup--active");
            });
        },

        init: function init() {
            var _this4 = this;

            this.$trigger.click(function () {
                return _this4.open();
            });
            this.$closeBtn.click(function () {
                return _this4.close();
            });
            this.$overlay.click(function () {
                return _this4.close();
            });
        }
    };

    doc.addEventListener("DOMContentLoaded", function () {
        initCarousels();
        fixedNavbar.init();
        mobileMenu.init();
        callbackPopup.init();
        animatedInput();
        smoothScrollJq();
        $(".js-phone-mask").mask('+7 (999) 999-99-99', { "autoclear": false });
    });

    win.addEventListener("scroll", function () {
        fixedNavbar.init();
    });
})(window, document);