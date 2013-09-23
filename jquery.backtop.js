/**
 * 回到顶部的jquery扩展。
 * 最简单的使用方法
 * $backtop.backtop({
		mainBody: $('.content')
	});
	$backtop是回到顶部的dom对象
	$('.content')是容纳页面内容的dom元素
 *
 * @author yongxin.pan
 * @version 1.0.0
 * @create time 2013-07-10
 */
(function($) {
	$.fn.backtop = function(opts) {
		this.each(function() {
			init.call(this, opts);
		});
		return this;
	};

	var init = function(opts) {

		var $el = $(this),
			$win = $(window);

		var options = $.extend({}, {
			mainBody: null, //参照的页面的宽度，用来自适应窗口的大小
			offset: null, //设置回到顶部的位置，不传也行
			scrollTop: 400 //默认当鼠标滚动400像素点时候就出现回到顶部的标签
		}, opts || {}),
			isIE6 = $.browser.msie && $.browser.version < 7, //判断是否是ie6
			defaultBacktopTop = $win.height() + 700, //默认距离顶部的距离
			hasShow = false, //默认还没显示
			timer = null;

		var _showBacktop = function(top) {
			$el.stop(true).animate({
				top: top + 'px'
			}, 'slow');
		};

		var _setLeft = function() {
			var mainBodyW = options.mainBody.width(),
				backtopW = $el.width(),
				winW = $win.width();

			$el[0].style.right = null;
			var leastWidth = options.offset && options.offset.left ? (options.offset.left + backtopW) : (mainBodyW + options.mainBody.offset().left + backtopW * 1.618);

			if (leastWidth > winW) {
				// if (mainBodyW > winW) {
					$el[0].style.left = null;
					$el.css('right', 10);
				// } else {
				// 	$el.css('left', options.mainBody.offset().left + mainBodyW - backtopW);
				// }
			} else {
				$el.css('left', options.offset && options.offset.left ? options.offset.left : (mainBodyW + options.mainBody.offset().left + backtopW * 0.618));
			}
		};

		var _setTop = function() {
			var scrollTop = $win.scrollTop();
			var offsetTop = options.offset && options.offset.top ? options.offset.top : $win.height() - ($el.height() + 100);
			if (isIE6) {
				$el[0].style.setExpression('top', 'document.compatMode=="CSS1Compat"?' +
					'documentElement.scrollTop+' + offsetTop + ':document.body.scrollTop+' + offsetTop);
			} else {
				_showBacktop(offsetTop);
			}
		};

		var _initPosition = function() {

			if (isIE6) {
				var offsetTop = options.offset && options.offset.top ? options.offset.top : $win.height() - ($el.height() + 100);
				$el.css('position', 'absolute');
				$el.hide();
				$el[0].style.setExpression('top', 'document.compatMode=="CSS1Compat"?' +
					'documentElement.scrollTop+' + offsetTop + ':document.body.scrollTop+' + offsetTop);
				var body = document.body;
				if (body.currentStyle.backgroundImage == 'none') {
					body.style.backgroundImage = window.location.protocol == 'https:' ? 'url(https:///)' : 'url(about:blank)';
					body.style.backgroundAttachment = 'fixed';
				}
			} else {
				$el.css('position', 'fixed');
				$el.css('top', defaultBacktopTop);
			}

			_setLeft();

			if (!isIE6) {
				$el.show();
			}
		};

		var _handleScroll = function(e) {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(_scroll, 300);
		};

		var _scroll = function() {

			var nowScrollTop = $win.scrollTop();
			var btOffset = $el.offset();
			if (isIE6) {
				if (nowScrollTop >= options.scrollTop && !hasShow) {
					$el.show();
					hasShow = true;
				} else if (nowScrollTop < options.scrollTop && hasShow) {
					$el.hide();
					hasShow = false;
				}
			} else {

				var offsetTop = options.offset && options.offset.top ? options.offset.top : $win.height() - ($el.height() + 100);

				if (nowScrollTop >= options.scrollTop && !hasShow) {
					_showBacktop(offsetTop);
					hasShow = true;
				} else if (nowScrollTop < options.scrollTop && hasShow) {
					_showBacktop(defaultBacktopTop);
					hasShow = false;
				}
			}
		};

		var _handleResize = function(e) {
			if ($win.scrollTop() >= options.scrollTop) {
				_setLeft();
				_setTop();
			} else {
				_initPosition();
			}
		};

		_initPosition();
		$win.bind('scroll', _handleScroll);
		$win.bind('resize', _handleResize);
		$win.trigger('scroll');
	};
})(jQuery);