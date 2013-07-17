/**
 * 倒计时插件，
 * 使用简单传入还剩下的时间，以秒为单位
 * 传入相应的处理函数
 * 例如：
 * <div id='abc' data-remainTime="323230000"></div>
 * $('#abc').countdown({
 * 			renderDays: function(day){ console.log(day)},
			renderHours: function(hour){ console.log(hour)}, 
			renderMinutes: function(mintue){ console.log(mintue)},
			renderSeconds: function(second){ console.log(second)}
 * });
 *
 * @author yongxin.pan
 * @version 1.0.0
 * @create time 2013-07-11
 */
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
				renderDays: $.noop, //处理天变化时的函数
				renderHours: $.noop, //处理小时变化时的函数
				renderMinutes: $.noop, //处理分变化时的函数
				renderSeconds: $.noop //处理秒变化时的函数
			}, opts || {}),
			remainTime = $el.data('remainTime') || 0 //总共还剩几秒

		var _countdown = function() {
			_second();
			remainTime--;
			setTimeout(_countdown, 1000);
		};

		var _second = function() {
			var seconds = Math.floor(remainTime);
			var second = seconds % 60;
			options.renderSeconds(second);
			_minute(seconds - second);
		};
		var _minute = function(seconds) {
			var minutes = Math.floor(seconds / 60);
			var mintue = minutes % 60;
			options.renderMinutes(mintue);
			_hour(minutes - mintue);
		};
		var _hour = function(minutes) {
			var hours = Math.floor(minutes / 60);
			var hour = hours % 24;
			options.renderHours(hour);
			_day(hours - hour);
		};
		var _day = function(hours) {
			var days = Math.floor(hours / 24);
			options.renderDays(days);
		};
		_countdown();
	};
})(jQuery);