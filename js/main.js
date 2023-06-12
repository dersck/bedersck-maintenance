(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : 'https://bedersck.us21.list-manage.com/subscribe/post-json?u=84f895c1208ab250f12f03bb6&amp;id=268fe320fb&amp;f_id=00bf59e1f0' // mailchimp url
                };
    const $WIN = $(window);

    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {        

            $("#loader").fadeOut("slow", function() {
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


    const ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };

    const ssSlickSlider = function() {
            
        $('.intro-slider').slick({
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            speed: 3000
        });
    };

    const ssModal = function() {

        const modal = document.querySelector(".modal");
        const trigger = document.querySelector(".modal-trigger");
        const closeButton = document.querySelector(".modal__close");

        function toggleModal() {
            modal.classList.toggle("show-modal");
        }
        function windowOnClick(event) {
            if (event.target === modal) {
                toggleModal();
            }
        }
        function pressEsc(event) {
            if (event.which=='27') {
                modal.classList.remove("show-modal");
            }
        }

        trigger.addEventListener("click", toggleModal);
        closeButton.addEventListener("click", toggleModal);
        window.addEventListener("click", windowOnClick);
        window.addEventListener("keyup", pressEsc);

    };


    const ssFinalCountdown = function() {

        const finalDate = '2023/06/19';

        $('.counter').countdown(finalDate)
        .on('update.countdown finish.countdown', function(event) {

            const str = '<div class=\"counter__time days\">%D&nbsp;<span>D</span></div>' +
                        '<div class=\"counter__time hours\">%H&nbsp;<span>H</span></div>' +
                        '<div class=\"counter__time minutes\">%M&nbsp;<span>M</span></div>' +
                        '<div class=\"counter__time seconds\">%S&nbsp;<span>S</span></div>';
                    
            $(this).html(event.strftime(str));

        });
    };


    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                window.location.hash = target;
            });
        });

    };


    const ssBackToTop = function() {
        
        const pxShow      = 500;
        const $goTopButton = $(".ss-go-top")

        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };


    const ssAjaxChimp = function() {
            
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Enviando...',
            0: '<i class="fas fa-check"></i> Te hemos enviado un correo electrónico de confirmación',
            1: '<i class="fas fa-exclamation-triangle"></i> Por favor, ingresa un valor.',
            2: '<i class="fas fa-exclamation-triangle"></i> Una dirección de correo electrónico debe contener una sola @.',
            3: '<i class="fas fa-exclamation-triangle"></i> La parte del dominio de la dirección de correo electrónico no es válida (la parte después de la @: )',
            4: '<i class="fas fa-exclamation-triangle"></i> La parte del nombre de usuario de la dirección de correo electrónico no es válida (la parte anterior a la @: ).',
            5: '<i class="fas fa-exclamation-triangle"></i> Esta dirección de correo electrónico parece falsa o inválida. Introduzca una dirección de correo electrónico real'
        }
    };

    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssSlickSlider();
        ssModal();
        ssFinalCountdown();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();
        ssAjaxChimp();

    })();

})(jQuery);