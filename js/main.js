(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // WOW.js
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    /* ==========================
       REFERENCES SLIDER (SAFE)
    ========================== */

$(document).ready(function () {

    const $track = $('.slider-track');
    let $slides = $('.slide');
    const $dots = $('.dot');

    const visibleCount = 5;
    const centerOffset = Math.floor(visibleCount / 2);
    const realCount = $slides.length;

    /* === BAŞA VE SONA KLON EKLE === */
    for (let i = 0; i < centerOffset; i++) {
        $track.prepend($slides.eq(realCount - 1 - i).clone());
        $track.append($slides.eq(i).clone());
    }

    $slides = $('.slide'); // yeniden al
    let currentIndex = centerOffset;

    const slideWidthPercent = 100 / visibleCount;

    function updateSlider(animate = true) {
        if (!animate) {
            $track.css('transition', 'none');
        } else {
            $track.css('transition', 'transform 0.6s ease');
        }

        const offset = (currentIndex - centerOffset) * slideWidthPercent;
        $track.css('transform', 'translateX(-' + offset + '%)');

        $slides.removeClass('active');
        $slides.eq(currentIndex).addClass('active');

        const realIndex =
            (currentIndex - centerOffset + realCount) % realCount;

        $dots.removeClass('active');
        if ($dots.eq(realIndex).length) {
            $dots.eq(realIndex).addClass('active');
        }
    }

    updateSlider(false);

    /* === OKLAR === */
    window.nextSlide = function () {
        currentIndex++;
        updateSlider();

        if (currentIndex >= realCount + centerOffset) {
            setTimeout(() => {
                currentIndex = centerOffset;
                updateSlider(false);
            }, 600);
        }
    };

    window.prevSlide = function () {
        currentIndex--;
        updateSlider();

        if (currentIndex < centerOffset) {
            setTimeout(() => {
                currentIndex = realCount + centerOffset - 1;
                updateSlider(false);
            }, 600);
        }
    };

    /* === DOT TIKLAMA === */
    window.goSlide = function (index) {
        currentIndex = index + centerOffset;
        updateSlider();
    };

    /* === OTOMATİK === */
    let autoSlide = setInterval(nextSlide, 1800);

    /* === DRAG / SWIPE === */
    let startX = 0;
    let isDragging = false;

    $track.on('mousedown touchstart', function (e) {
        isDragging = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        clearInterval(autoSlide);
    });

    $track.on('mouseup touchend', function (e) {
        if (!isDragging) return;

        let endX = e.pageX || e.originalEvent.changedTouches[0].pageX;
        let diff = startX - endX;

        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();

        isDragging = false;
        autoSlide = setInterval(nextSlide, 1800);
    });

});


})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".navbar-nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});