/**
 * Add any custom theme JavaScript to this file.
 */

function adjustTopImage($) {

	var topBar = $('.site-header');
	var media = $('.top-home .widget_media_image');
	var bottomOfTopBar = topBar.outerHeight() + $(window).scrollTop();
	var bottomOfMediaImage = media.outerHeight() + media.offset().top;
	var topSecondaryNav = $('.nav-secondary').offset().top;

	var secondNavDirectlyInBody = $('.nav-secondary').parent().is('body');
	if (bottomOfTopBar >= topSecondaryNav && secondNavDirectlyInBody) {
		$('.nav-secondary').detach().appendTo(".site-header");
		var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
		$('header.site-header').next().css('margin-top', contentPlacement);
	}

	if (bottomOfMediaImage >= bottomOfTopBar && !secondNavDirectlyInBody) {
		$('.nav-secondary').detach().insertBefore(".site-inner");
		var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
		$('header.site-header').next().css('margin-top', contentPlacement);
	}
}

(function (document, $) {

	'use strict';

	var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
	$('header.site-header').next().css('margin-top', contentPlacement);
	if ($(".top-home img").length > 0) {
		$(".top-home img").load(
			function () {
				$('.nav-secondary').detach().insertBefore(".site-inner");
				var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
				$('header.site-header').next().css('margin-top', contentPlacement);
				$('top-home').css('margin-top', 0);

				$(window).scroll(function () { adjustTopImage($) });
				$(window).resize(function () { adjustTopImage($) });
			}
		);
	}
	else {
		var contentPlacement = $('.site-container header').position().top + $('.site-container header').height();
		$('.site-inner').css('margin-top', contentPlacement);
		$('top-home').css('margin-top', 0);
	}

	//alert($('#categories-foldable'));

	//$('#categories-foldable').foldable({
	//	groups: '[data-foldable-role="group"]', // $('[data-foldable-role="group"]') will work too
	//	triggers: '[data-foldable-role="trigger"]', // $('[data-foldable-role="trigger"]') will work too
	//	targets: '[data-foldable-role="target"]' // $('[data-foldable-role="target"]') will work too
	//});

} )( document, jQuery );

