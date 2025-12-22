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

/* ==========================
   REFERENCES SLIDER (RESPONSIVE & SAFE)
========================== */

$(document).ready(function () {

    const $track = $('.slider-track');
    let $slides = $('.slide');
    const $dots = $('.dot');
    const realCount = $slides.length;

    function getVisibleCount() {
        if (window.innerWidth < 576) return 1;      // Mobil
        if (window.innerWidth < 992) return 3;      // Tablet
        return 5;                                   // Desktop
    }

    let visibleCount = getVisibleCount();
    let centerOffset = Math.floor(visibleCount / 2);
    let currentIndex = centerOffset;

    function buildClones() {
        $track.empty();
        for (let i = 0; i < realCount; i++) {
            $track.append($slides.eq(i).clone());
        }
        $slides = $track.children();

        for (let i = 0; i < centerOffset; i++) {
            $track.prepend($slides.eq(realCount - 1 - i).clone());
            $track.append($slides.eq(i).clone());
        }
        $slides = $track.children();
    }

    function updateSlider(animate = true) {
        const slideWidth = 100 / visibleCount;

        $('.slide').css('width', slideWidth + '%');

        $track.css('transition', animate ? 'transform 0.6s ease' : 'none');
        $track.css('transform', `translateX(-${(currentIndex - centerOffset) * slideWidth}%)`);

        $slides.removeClass('active');
        $slides.eq(currentIndex).addClass('active');

        const realIndex = (currentIndex - centerOffset + realCount) % realCount;
        $dots.removeClass('active').eq(realIndex).addClass('active');
    }

    function rebuild() {
        visibleCount = getVisibleCount();
        centerOffset = Math.floor(visibleCount / 2);
        currentIndex = centerOffset;
        buildClones();
        updateSlider(false);
    }

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

    window.goSlide = function (i) {
        currentIndex = i + centerOffset;
        updateSlider();
    };

    let autoSlide = setInterval(nextSlide, 2200);

    $(window).on('resize', function () {
        rebuild();
    });

    rebuild();
});
