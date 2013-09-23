(function($) {
	$.fn.share = function(opts) {
		this.each(function() {
			init.call(this, opts);
		});
		return this;
	};
	var share_site = {
		sina: {
			address: 'http://v.t.sina.com.cn/share/share.php?',
			title: 'title',
			url: 'url',
			otherparams: {
				appkey: '2195013283'
			}
		},
		qq: {
			address: 'http://v.t.qq.com/share/share.php?',
			title: 'title',
			url: 'url',
			otherparams: {
				appkey: '90a4179de3f54edcbdb045b3d8fbc80d',
				site: encodeURIComponent('http://www.qunar.com')
			}
		},
		qzone: {
			address: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
			title: 'summary',
			url: 'url',
			otherparams: {}
		},
		douban: {
			address: 'http://shuo.douban.com/!service/share?',
			title: 'name',
			url: 'href',
			otherparams: {}
		},
		renren: {
			address: 'http://widget.renren.com/dialog/share?',
			title: 'description',
			url: 'resourceUrl',
			otherparams: {}
		},
		kaixin: {
			address: 'http://www.kaixin001.com/repaste/bshare.php?',
			title: 'rcontent',
			url: 'rurl',
			otherparams: {}
		}
	};
	var init = function(opts) {
		var $el = $(this);
		var options = $.extend({
			title: '',
			url: encodeURIComponent(location.href)
		}, opts || {});

		var site = $.trim($el.data('share'));
		var share = share_site[site];
		var href = share.address + share.title + '=' + encodeURIComponent(options.title) + '&' + share.url + '=' + options.url;
		for (var key in share.otherparams) {
			href = href + '&' + share.otherparams[key]
		}
		$el.attr('href', href);
	};
})(jQuery);