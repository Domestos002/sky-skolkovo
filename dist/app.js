;(function(win, doc) {
    'use strict';
    var burger = $("#burger");
    var headerPanelMobile = $("#header-panel-mobile");
    var navbar = $("#header-navbar__nav");
    var body = $("body");
    var html = $("html");
    var flag = true;
    var first = true;
    var callbackBtnMobile = $(".callback-btn-mobile");

    function addCount(target ,e) {
        if (e.relatedTarget.relative(e.item.index + 1) == 0) {
            target.text(e.item.count + "/" + e.item.count);
        } else {
            target.text(e.relatedTarget.relative(e.item.index + 1) + "/" + e.item.count);
        }
    }
    function apartmetnsCarousel(){
        var apartmentsSlider = $("#apartments-slider0");
        var nextApartments = $("#apartments-slider-next0");
        var prevApartments = $("#apartments-slider-prev0");
        var countApartments = $("#apartments-slider-count0");
        var apartmentsSlider1 = $("#apartments-slider1");
        var nextApartments1 = $("#apartments-slider-next1");
        var prevApartments1 = $("#apartments-slider-prev1");
        var countApartments1 = $("#apartments-slider-count1");
        var apartmentsSlider2 = $("#apartments-slider2");
        var nextApartments2 = $("#apartments-slider-next2");
        var prevApartments2 = $("#apartments-slider-prev2");
        var countApartments2 = $("#apartments-slider-count2");
        var apartmentsSlider3 = $("#apartments-slider3");
        var nextApartments3 = $("#apartments-slider-next3");
        var prevApartments3 = $("#apartments-slider-prev3");
        var countApartments3 = $("#apartments-slider-count3");
        var apartmentsSlider4 = $("#apartments-slider4");
        var nextApartments4 = $("#apartments-slider-next4");
        var prevApartments4 = $("#apartments-slider-prev4");
        var countApartments4 = $("#apartments-slider-count4");
        apartmentsSlider.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });
            nextApartments.click(function(){
                apartmentsSlider.trigger('next.owl.carousel');
            });
            prevApartments.click(function(){
                apartmentsSlider.trigger('prev.owl.carousel');
            });
        apartmentsSlider.on('initialized.owl.carousel', function(e) {
            addCount(countApartments, e);
        });
        apartmentsSlider.on('changed.owl.carousel', function(e) {
            addCount(countApartments, e);
        });
        apartmentsSlider1.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });
            nextApartments1.click(function(){
                apartmentsSlider1.trigger('next.owl.carousel');
            });
            prevApartments1.click(function(){
                apartmentsSlider1.trigger('prev.owl.carousel');
            });
        apartmentsSlider1.on('initialized.owl.carousel', function(e) {
            addCount(countApartments1, e);
        });
        apartmentsSlider1.on('changed.owl.carousel', function(e) {
            addCount(countApartments1, e);
        });
        apartmentsSlider2.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });
            nextApartments2.click(function(){
                apartmentsSlider2.trigger('next.owl.carousel');
            });
            prevApartments2.click(function(){
                apartmentsSlider2.trigger('prev.owl.carousel');
            });
        apartmentsSlider2.on('initialized.owl.carousel', function(e) {
            addCount(countApartments2, e);
        });
        apartmentsSlider2.on('changed.owl.carousel', function(e) {
            addCount(countApartments2, e);
        });
        apartmentsSlider3.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });
            nextApartments3.click(function(){
                apartmentsSlider3.trigger('next.owl.carousel');
            });
            prevApartments3.click(function(){
                apartmentsSlider3.trigger('prev.owl.carousel');
            });
        apartmentsSlider3.on('initialized.owl.carousel', function(e) {
            addCount(countApartments3, e);
        });
        apartmentsSlider3.on('changed.owl.carousel', function(e) {
            addCount(countApartments3, e);
        });
        apartmentsSlider4.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });
            nextApartments4.click(function(){
                apartmentsSlider4.trigger('next.owl.carousel');
            });
            prevApartments4.click(function(){
                apartmentsSlider4.trigger('prev.owl.carousel');
            });
        apartmentsSlider4.on('initialized.owl.carousel', function(e) {
            addCount(countApartments4, e);
        });
        apartmentsSlider4.on('changed.owl.carousel', function(e) {
            addCount(countApartments4, e);
        });
    }

    function carousels(){
        var gallerySlider = $("#gallery-slider");
        var masonrySlider = $("#masonry-slider");

        var nextMasonry = $("#masonry-slider-next");
        var prevMasonry = $("#masonry-slider-prev");
        var next = $("#gallery-slider-next");
        var prev = $("#gallery-slider-prev");

        nextMasonry.click(function(){
            masonrySlider.trigger('next.owl.carousel');
        });

        prevMasonry.click(function(){
            masonrySlider.trigger('prev.owl.carousel');
        });

        next.click(function(){
            gallerySlider.trigger('next.owl.carousel');
        });

        prev.click(function(){
            gallerySlider.trigger('prev.owl.carousel');
        });

        masonrySlider.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });

        gallerySlider.owlCarousel({
            items: 1,
            dots: false,
            nav: false,
            autoplay: false,
            autoHeight:true,
            loop: true,
            margin: 20
        });

        apartmetnsCarousel();
    }
    var fixedNavbar = {
        navbar : doc.getElementById("fixed-navbar"),
        pageHero : doc.getElementById("page-hero"),
        init: function() {
            if (win.innerWidth >=1024){
                if (this.pageHero.getBoundingClientRect().bottom <= 0){
                    this.navbar.classList.remove("is-hidden");
                }
                else if (this.pageHero.getBoundingClientRect().bottom >= 0){
                    this.navbar.classList.add("is-hidden");
                }
            }
        }
    };
    function animatedInput(){
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
    }
    function width() {
        if (win.innerWidth >=1024){
            flag = false;
        }
        if (win.innerWidth <= 1023){
            flag = true;
        }
    }
    width();
    function iOS() {

        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];

        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()){ return true; }
            }
        }

        return false;
    }
    function mobileMenu(){
        if (win.innerWidth <=1023 ){
            $(".header-navbar__link.js-scrollScreen").click(function(){
                headerPanelMobile.removeClass("active");
                body.removeClass("is-ovh");
                html.removeClass("is-ovh");
                navbar.removeClass("active");
                navbar.stop().fadeOut(400)
            })
        }
        function panel(){
            if (!headerPanelMobile.hasClass("active")){
                headerPanelMobile.addClass("active");
                body.addClass("is-ovh");
                html.addClass("is-ovh");
            }
            else if (headerPanelMobile.hasClass("active")){
                headerPanelMobile.removeClass("active");
                body.removeClass("is-ovh");
                html.removeClass("is-ovh");
            }
        }

        function navbarF(){
            if (!navbar.hasClass("active")){
                navbar.addClass("active");
                navbar.stop().fadeIn(400);
            }
            else if (navbar.hasClass("active")){
                navbar.removeClass("active");
                navbar.stop().fadeOut(400);
                body.removeClass("is-ovh");
                html.removeClass("is-ovh");
            }
        }

        burger.click(function(){
            panel();
            navbarF();
        });

        win.addEventListener("resize", function() {
            width();
            if (!flag && first){
                first = false;
                navbar.css({"display" : "block"});
                headerPanelMobile.removeClass("active");
                navbar.removeClass("active");
            }
            if (flag && !first){
                first = true;
                navbar.css({"display" : "none"});
            }
        });
    }
    function chart(){
        Chart.defaults.global.defaultFontColor = "#fff";
        Chart.defaults.global.defaultCo
        var chart = document.getElementById("investorsChart").getContext('2d');
        var myChart = new Chart(chart, {
            type: 'line',

            data: {
                labels: ["2012", "2014", "2018", "2016", "2020"],
                gridLines: {
                    display: false ,
                    color: "#FFFFFF"
                },

                datasets: [{
                    backgroundColor: "rgba(0,0,0,0)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    data : [65,59,90,81,5],
                    borderWidth: 1
                }]
            },
            options: {
                legend:{
                    display:false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }
    doc.addEventListener("DOMContentLoaded", function() {
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
        carousels();
        fixedNavbar.init();
        animatedInput();
        mobileMenu();
        if (iOS() && isTouch){
            $("html").addClass("ios-touch");
            $("input")
                .on('focus', function(e) {
                    headerPanelMobile.addClass("absolute");
                    callbackBtnMobile.addClass("absolute");

                })
                .on('blur', function(e) {
                    headerPanelMobile.removeClass("absolute");
                    callbackBtnMobile.removeClass("absolute");
                });
            $("textarea")
                .on('focus', function(e) {
                    headerPanelMobile.addClass("absolute");
                    callbackBtnMobile.addClass("absolute");
                })
                .on('blur', function(e) {
                    headerPanelMobile.removeClass("absolute");
                    callbackBtnMobile.removeClass("absolute");
                });
        }
        chart();
    });

    win.addEventListener("scroll", function() {
        fixedNavbar.init();
    });
})(window, document);

$(function () {
    $('a.js-scrollScreen[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
            if (target.length) {

                if (window.innerWidth >= 1023) {
                    if ($(this).attr('href') === "#about"){
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                    }
                    else if ($(this).attr('href') !== "#about"){
                        $('html, body').animate({
                            scrollTop: target.offset().top - 70
                        }, 1000);
                    }

                }
                else if (window.innerWidth <= 1023 && window.innerWidth > 768){
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                }
                else if (window.innerWidth <= 768){
                    $('html, body').animate({
                        scrollTop: target.offset().top - 60
                    }, 1000);
                }
                return false;
            }
        }
    });
});
