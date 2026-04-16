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
