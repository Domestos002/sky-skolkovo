;(function(win, doc) {
    'use strict';
    const $body = $("body");
    const $html = $("html");

    const smoothScrollJq = () => {
        $("a.js-scrollScreen[href^='#']").click(function(e) {
            e.preventDefault();
            
            const offsetTop = $($(this).attr("href")).offset().top;
            const position = offsetTop - 20;

            $("body, html").animate({
                scrollTop: position
            });
        });
    };
    const animatedInput = () => {
        var input = $(".input.input--line");

        input.focus(function() {
            $(this).addClass("focus");
        });
        input.blur(function() {
            $(this).removeClass("focus");
        });
        input.change(function() {
            if ($(this).val() !== "" && !$(this).hasClass("char"))  {
                $(this).addClass("char");
            }
            else if ($(this).val() === ""){
                $(this).removeClass("char");
            }
        });
    };

    const fixedNavbar = {
        $navbar : $("#fixed-navbar"),
        $pageHero : $("#page-hero"),
        init: function() {
            if (win.innerWidth >=1024){
                const isScrolled = this.$pageHero[0].getBoundingClientRect().bottom <= 0;
                isScrolled ? this.$navbar.removeClass("is-hidden") : this.$navbar.addClass("is-hidden");
            }
        }
    };

    const mobileMenu = {
        $headerPanelMobile: $("#header-panel-mobile"),
        $navbar: $("#header-navbar__nav"),
        $burger: $("#burger"),
        pageToOvh: function() {
            $body.addClass("is-ovh");
            $html.addClass("is-ovh");
        },
        pageRemoveOvh: function() {
            $body.removeClass("is-ovh");
            $html.removeClass("is-ovh");
        },
        panel: function() {
            const isActive = this.$headerPanelMobile.hasClass("active");
            if (!isActive){
                this.$headerPanelMobile.addClass("active");
                this.pageToOvh();
            }
            else {
                this.$headerPanelMobile.removeClass("active");
                this.pageRemoveOvh();
            }
        },
        navbar: function() {
            const isActive = this.$navbar.hasClass("active");
            if (!isActive){
                this.$navbar.addClass("active");
                this.$navbar.stop().fadeIn(400);
            }
            else {
                this.$navbar.removeClass("active");
                this.$navbar.stop().fadeOut(400);
                this.pageRemoveOvh();
            }
        },
        init: function() {
            this.$burger.click(() => {
                this.panel();
                this.navbar();
            });
            this.$navbar.on('click', '.header-navbar__link', () => {
                if (win.innerWidth <= 1023 ){
                    this.$headerPanelMobile.removeClass("active");
                    this.pageRemoveOvh();
                    this.$navbar.removeClass("active");
                    this.$navbar.stop().fadeOut(400)
                }
            });
        },
    };

    let Carousel = function (carousel) {
        this.$carousel = $(carousel);
        this.$next = $(`${carousel}-next`);
        this.$prev = $(`${carousel}-prev`);

        this.init = function() {
            this.$next.click(() => {
                this.$carousel.trigger('next.owl.carousel');
            });
            this.$prev.click(() => {
                this.$carousel.trigger('prev.owl.carousel');
            });
            this.$carousel.owlCarousel({
                items: 1,
                dots: false,
                nav: false,
                autoplay: false,
                autoHeight:true,
                loop: true,
                margin: 20
            });
        }
    };

    const initCarousels = function() {
        new Carousel("#gallery-slider").init();
        new Carousel("#masonry-slider").init();
    };

    const callbackPopup = {
        $trigger: $(".js-callback-toggle"),
        $popup: $("#callback-popup"),
        $overlay: $("#callback-popup-overlay"),
        $closeBtn: $("#callback-popup-close"),
        $delay: 300,
        open: function() {
            this.$popup.addClass("callback-popup--active");
            this.$overlay.stop().fadeIn(this.delay);
        },

        close: function() {
            this.$overlay.stop().fadeOut(100, () => {
                this.$popup.removeClass("callback-popup--active");
            });
        },

        init: function() {
            this.$trigger.click(() => this.open());
            this.$closeBtn.click(() => this.close());
            this.$overlay.click(() => this.close());
        }
    };

    doc.addEventListener("DOMContentLoaded", function() {
        initCarousels();
        fixedNavbar.init();
        mobileMenu.init();
        callbackPopup.init();
        animatedInput();
        smoothScrollJq();
        $(".js-phone-mask").mask('+7 (999) 999-99-99', { "autoclear": false });
    });

    win.addEventListener("scroll", function() {
        fixedNavbar.init();
    });

})(window, document);
