/**
 * tab切换插件
 * 实例参考门票detail页面的游玩贴士
 * $('#sight-playWay').find('.tags_play_des').tabswitch({
		tabSelector: '.module_tags_tab_list a',
		contentSelector: '.module_des',
		clickAction: function(nextTab, nextContent, nowTab, nowContent) {
			nextTab.addClass('active');
			nowTab.removeClass('active');
			nextContent.show();
			nowContent.hide();
		}
	});
 *@author yongxin.pan
 *@version 1.0.0
 *@create time 2013-07-12
 */
(function($) {
	$.fn.tabswitch = function(opts) {
		this.each(function() {
			init.call(this, opts);
		});
		return this;
	};

	var init = function(opts) {
		var $el = $(this),
			options = $.extend({}, {
				tabSelector: null, //tab选择器
				contentSelector: null, //内容选择器
				firstClick: $.noop, //当第一次点还未显示的tab的时候，需要做的事情,例如可以处理图片的延迟加载等
				clickAction: $.noop //当点击后要执行的方法
			}, opts || {}),
			index = 0,
			loaded = [index];

		var tabs = $el.find(options.tabSelector)
		var contents = $el.find(options.contentSelector)
		var nowTab = tabs.first();
		var nowContent = contents.first();

		var _isLoaded = function(index) {
			return $.inArray(index, this.loaded) > -1;
		};

		var _handleClick = function(e) {
			var nextTab = $(e.currentTarget);
			var next = nextTab.index();
			if (index == next) {
				return false;
			}
			index = next;
			var nextContent = contents.eq(index);
			if (!_isLoaded(index)) {
				loaded.push(index);
				options.firstClick(nextTab, nextContent, nowTab, nowContent);
			}
			options.clickAction(nextTab, nextContent, nowTab, nowContent);
			nowTab = nextTab;
			nowContent = nextContent;
			return false;
		};

		$el.on('click', options.tabSelector, _handleClick);
	};
})(jQuery);