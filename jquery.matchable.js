(function($) {

	$.extend({
		matchable: {
			realTime: true,
			cache: {},
			matchers: {
				radio: radioMatcher,
				checkbox: checkboxMatcher,
				select: selectMatcher
			},
			register: function(name, element, type) {
				element.data('matchable-name', name);
				this.cache[name] = generate(element, type);
			},
			action: function(element) {
				if (element && element.length) {
					var name = element.data('matchable-name');
					// var regExp = new RegExp('^(.+&)?\[\\w\\d\]+\\[');/^(.+[|&])*m2\[/
					var regExp = new RegExp('^(.+[|&])*' + name + '\\[');
					$("[data-matchable]").each(function(i, v) {
						var $el = $(this);
						var cond = $.trim($el.data('matchable'));
						var type = $.trim($el.data('matchable-type'));
						if (cond && regExp.test(cond)) {
							var value = parse(cond);
							change($el, type, value);
						}
					});
				} else {
					$("[data-matchable]").each(function(i, v) {
						var $el = $(this);
						var cond = $.trim($el.data('matchable'));
						var type = $.trim($el.data('matchable-type'));
						if (cond) {
							var value = parse(cond);
							change($el, type, value);
						}
					});
				}
			},
			setRealTime: function(realTime) {
				this.realTime = realTime;
			}
		}
	});

	function generate(element, type) {
		return $.matchable.matchers[type] && new $.matchable.matchers[type](element);
	};

	function parse(cond) {
		var code = cond.replace(/\|/g, '||').replace(/\&/g, '&&').replace(/(\w+)\[(\w+)\]/g, function(str, v1, v2) {
			return 'check("' + v1 + '", "' + v2 + '")';
		});

		return eval(code);
	};

	function check(name, value) {
		var m = $.matchable.cache[name];
		
		if (!m) { alert('no matcher : ' + name); return true; }

		return m.check(value);
	};

	function change(element, type, value) {
		switch (type) {
			case 'disabled':
				diasbledAction(element, value);
				break;
			case 'active':
				diasbledAction(element, value);
				defaultAction(element, value);
				break;
			default:
				defaultAction(element, value);
				break;
		}
	};

	function diasbledAction(element, value) {
		if (value) {
			element[0].hasChildNodes() && element.find('input,textarea,select').removeAttr('disabled') || element.removeAttr('disabled');
		} else {
			element[0].hasChildNodes() && element.find('input,textarea,select').attr('disabled', true) || element.attr('disabled', true);
		}
	};

	function defaultAction(element, value) {
		value && element.show() || element.hide();
	};

	function radioMatcher(element) {
		this.element = element;
		element.bind('click', function(e) {
			$.matchable.action($(e.currentTarget));
		});
	};

	radioMatcher.prototype.check = function(value) {

		var checkValue = '';
		this.element.each(function() {
			if (this.checked) {
				checkValue = this.value;
				return false;
			}
		});

		return checkValue === value;
	};

	function checkboxMatcher(element) {
		this.element = element;
		element.bind('click', function(e) {
			$.matchable.action($(e.currentTarget));
		});
	};

	checkboxMatcher.prototype.check = function(value) {

		var result = [];
		this.element.each(function() {

			if (this.checked) {
				result.push(this.value);
			}
		});

		return $.inArray(value, result) > -1;
	};

	function selectMatcher(element) {
		this.element = element;
		this.element.bind('change', function(e) {
			$.matchable.action($(e.currentTarget));
		});
	};

	selectMatcher.prototype.check = function(value) {
		return this.element.val() === value;
	};


})(jQuery);