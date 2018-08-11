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

	if (window.matchMedia("(min-width: 896px)").matches) {

		var contentPlacement = $('header.site-header').position().top + $('header.site-header').height();
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
	}
	
	var mainMenuButtonClass = 'menu-toggle';
	var subMenuButtonClass = 'sub-menu-toggle';

	$(".top-header").on("main_menu.custom_click", "." + mainMenuButtonClass,
		function (evt) {
			$(".menu-toggle").toggle();
			$(".quadmenu-navbar-toggle").trigger("click", true);
			$(".quadmenu-navbar-header").css("margin-top", "-76px");
		});

	$(".top-header").on("click", ".quadmenu-navbar-toggle",
		function (evt, isTriggered) {
			if (!(isTriggered))
			{
				$(".menu-toggle").click();
			}
		});


	//$('.' + mainMenuButtonClass).on("main_menu.custom_click", function () {
	//	alert("this");
	//	$('.' + subMenuButtonClass).click('click.genesisMenu-subbutton');
	//});
} )( document, jQuery );
