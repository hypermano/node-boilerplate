'use strict';
(function ($) {
	$(document).ready(function() {
		var path = location.pathname;
		$('ul.nav li a[href="' + path + '"]').parent().addClass('active');
	});
})(jQuery);