(function($) {
	$.fn.tabswitch = function(opt) {
		var options = $.extend({}, {
			tabSelector: null,
			contentSelector: null,
			mapattr: '',
			init: $.noop,
			once: $.noop,
			before: $.noop,
			'do': $.noop,
			end: $.noop
		}, opt || {});
		this.each(function(index, el) {
			init.call(el, options);
		});
		return this;
	};
	var init = function(opt) {
		var $el = $(this),
			tabs = $el.find(opt.tabSelector),
			contents = $el.find(opt.contentSelector),
			nowTab = tabs.first(),
			nowContent = contents.first(),
			now = 0;

		var _getContent = (function() {
			if (opt.mapattr) {
				return function(index, tab) {
					return contents.filter('[' + opt.mapattr + '="' + $.trim(tab.attr(opt.mapattr)) + '"]');
				};
			} else {
				return function(index, tab) {
					return contents.eq(index);
				};
			}
		})();

		var _handleClick = function(e) {
			var nextTab = $(e.currentTarget);
			var next = nextTab.index();
			if (now === next) {
				return;
			}
			now = next;
			var nextContent = _getContent(next, nextTab);
			opt.before(nowTab, nowContent, nextTab, nextContent);
			opt['do'](nowTab, nowContent, nextTab, nextContent);
			opt.end(nowTab, nowContent, nextTab, nextContent);
			nowTab = nextTab;
			nowContent = nextContent;
			return false;
		};

		tabs.one('click', function(e) {
			var nextTab = $(e.currentTarget);
			var next = nextTab.index();
			var nextContent = _getContent(next, nextTab);
			opt.once(nowTab, nowContent, nextTab, nextContent);
			return false;
		});
		tabs.bind('click', _handleClick);
		opt.init();
	};
})(jQuery);