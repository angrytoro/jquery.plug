(function($, undefied) {
	$.fn.lazyLoadIMG = function(opts) {
		this.each(function() {
			init.call(this, opts);
		});
		return this;
	};

	function init(opts) {
		var options = $.extend({
			selector: 'img',
			effect: 'fadeIn',
			data_attribute: 'original'
		}, opts || {});

		var $imgs = $(this).find(options.selector);
		$imgs.each(function() {
			var $img = $(this);
			$('<img/>').bind('load', function() {
				options.effect($img.attr('src', $img.data(options.data_attribute)));
			}).attr('src', $img.data(options.data_attribute));
		});
	};
})(jQuery);