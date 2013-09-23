(function($) {
    $.fn.fixed = function(opt) {
        this.each(function() {
            init.call(this, opt);
        });
        return this;
    };
    var init = function(opt) {
        var options = $.extend({}, {
            referDom: $('body').children().eq(0),
            triggerTop: 400,
            fixedTop: 47
        }, opt || {});

        var $el = $(this);
        var $win = $(window);

        var isIE6 = $.browser.msie && $.browser.version < 7;
        var hasFixed = false;

        var scrollLeft = $win.scrollLeft();

        var referDomOffset = options.referDom.offset();
        // var isSmall = $win.width() < $('body').width();

        var setPosition = function() {
            $el.offset({
                top: referDomOffset.top,
                left: referDomOffset.left + options.referDom.width() + 20
            });

        };

        setPosition();

        var handleScroll = function(e) {

            if ($win.scrollLeft() != scrollLeft) {
                scrollLeft = $win.scrollLeft();
                return;
            }

            if (isIE6) {

                if ($win.scrollTop() >= options.triggerTop && !hasFixed) {

                    $el.css('position', 'absolute');
                    $el[0].style.setExpression('top', 'document.compatMode=="CSS1Compat"?' +
                        'documentElement.scrollTop+' + options.fixedTop + ':document.body.scrollTop+' + options.fixedTop);

                    var body = document.body;
                    if (body.currentStyle.backgroundImage == 'none') {
                        body.style.backgroundImage = window.location.protocol == 'https:' ? 'url(https:///)' : 'url(about:blank)';
                        body.style.backgroundAttachment = 'fixed';
                    }

                    hasFixed = true;

                } else if ($win.scrollTop() < options.triggerTop && hasFixed) {

                    $el[0].style.setExpression('top', referDomOffset.top);

                    hasFixed = false;
                }

            } else {

                if ($win.scrollTop() >= options.triggerTop && !hasFixed) {
                    $el.css({
                        position: 'fixed',
                        top: options.fixedTop + 'px'
                    });
                    hasFixed = true;
                } else if ($win.scrollTop() < options.triggerTop && hasFixed) {
                    $el.css({
                        position: 'absolute',
                        top: referDomOffset.top + 'px'
                    });
                    hasFixed = false;
                }
            }

        };

        var handleResize = function(e) {
            if ($win.width() < $('body').width()) {
                // isSmall = true;
                $el.hide();
            } else {
                $el.css('left', options.referDom.offset().left + options.referDom.width() + 20).show();
            }
        };

        $win.bind('scroll', handleScroll);
        $win.bind('resize', handleResize);
    };
})(jQuery);