(function($) {
	$.fn.countdown = function(opts) {
		this.each(function() {
			init.call(this, opts);
		});
		return this;
	};

	var init = function(opts) {
		var $el = $(this),
			options = $.extend({}, {
				renderDays: $.noop,
				renderHours: $.noop,
				renderMinutes: $.noop,
				renderSeconds: $.noop,
			}, opts || {}),
			deadline = new Date($el.data('deadline')); //default format 2013-01-01

		var _countdown = function() {
			setInterval(_second, 1000);
		};
		var _second = function() {
			var seconds = Math.floor((deadline.getTime() - new Date().getTime()) / 1000);
			var second = seconds % 60;
			//todo second action
			options.renderSeconds(second);
			_minute(seconds - second);
		};
		var _minute = function(seconds) {
			var minutes = Math.floor(seconds / 60);
			var mintue = minutes % 60;
			// todo minute action
			options.renderMinutes(mintue);
			_hour(minutes - mintue);
		};
		var _hour = function(minutes) {
			var hours = Math.floor(minutes / 60);
			var hour = hours % 24;
			// todo minute action
			options.renderHours(hour);
			_day(hours - hour);
		};
		var _day = function(hours) {
			var days = Math.floor(hours / 24);
			options.renderDays(days);
			// todo minute action
		};
		_countdown();
	};
})(jQuery);