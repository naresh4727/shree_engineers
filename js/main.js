$(function() {
	// Initialize products slider (Slick)
	if ($.fn.slick) {
		$('.products-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: false,
			// Disable adaptiveHeight so all slides can share a uniform height
			adaptiveHeight: false,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

		// Ensure all slides have the same height
		function setEqualSlideHeights() {
			var $cards = $('.products-slider .product-card');
			// reset
			$cards.css('height', 'auto');
			var max = 0;
			$cards.each(function() {
				var h = $(this).outerHeight();
				if (h > max) max = h;
			});
			if (max > 0) {
				$cards.css('height', max + 'px');
				$('.products-slider .slick-slide').css('height', max + 'px');
			}
		}

		// Run on init and after layout changes
		$('.products-slider').on('init reInit setPosition', function() {
			setEqualSlideHeights();
		});

		// Debounced resize
		var resizeTimer;
		$(window).on('resize', function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function() {
				setEqualSlideHeights();
				$('.products-slider').slick('setPosition');
			}, 150);
		});
	}
});

// Improve image loading behavior for non-critical images
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Lazy-load product slider images to reduce LCP impact
        document.querySelectorAll('.products-slider img, .product-media img').forEach(function(img) {
            if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
        });
    } catch (e) {
        // ignore
    }
});

// Numerical Counter Animation
const startCounter = () => {
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // Jitna kam, utna fast counting

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Intersection Observer to trigger when visible on screen
const observerOptions = {
    threshold: 0.5 // Jab 50% section dikhega tab start hoga
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.unobserve(entry.target); // Ek hi baar animate hoga
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-counter-section');
if(statsSection) {
    observer.observe(statsSection);
}


