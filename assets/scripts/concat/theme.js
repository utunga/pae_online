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


function adjustAToZSearchBar($) {
	var topBar = $('.site-header');
	var searchBar = $('.a_to_z_searchbar');
	var widget = $("div#a_to_z_widget");

	var bottomOfTopBar = topBar.outerHeight() + $(window).scrollTop();
	var topOfWidget = widget.offset().top;
	var searchBarInWidget = $('.a_to_z_searchbar').parent().is(widget);
	if (bottomOfTopBar >= topOfWidget && searchBarInWidget) {
		searchBar.detach().appendTo(".site-header");
		widget.toggleClass('extra-padding');
	}

	if (bottomOfTopBar < topOfWidget && !searchBarInWidget) {
		searchBar.detach().insertBefore(".a_to_z_jumplinks");
		widget.toggleClass('extra-padding');
	}

	// for mobile.. we fix at top of screen
	var widgetInWindowTop = widget.offset().top - $(window).scrollTop();
	var searchBarInWindowTop = searchBar.offset().top - $(window).scrollTop();
	if (widgetInWindowTop <= 1 && searchBarInWindowTop <= 0) {
		if (!searchBar.hasClass("fixed-at-top"))
			searchBar.addClass("fixed-at-top");
	}
	else {
		searchBar.removeClass("fixed-at-top");
	}
	
}


/**
 * Functions to handle mihi controls
 */
function handleMihiAudio($) {
	var audio = $('.audio');
	var volume = audio.find('.audio_icon');
	var player = audio.find('#mihi');
	if (audio && volume && player) {
		audio.on("click", "button",
			function () {
				toggle();
		});
		player.on("ended",
			function () {
				reset();
		});
		function toggle() {
			if( volume.hasClass('fa-volume-up') ) {
				volume.removeClass('fa-volume-up').addClass('fa-volume-off');
				player.trigger('play');
			} else {
				volume.removeClass('fa-volume-off').addClass('fa-volume-up');
				player.trigger('pause');
			}
		};
		function reset() {
			volume.removeClass('fa-volume-off').addClass('fa-volume-up');
			player.prop("currentTime",0);
		};
	}
}

function fixPaekakarikiSpelling($) {
	$("p").each(function () {
		$(this).html($(this).html().replace(/Paekakariki/g, "Paekākāriki"));
	});
}

function hackMenusForMobile($) {

	if (!window.matchMedia("(min-width: 896px)").matches) {
		console.log("hackin the menus");
		$('.nav-primary, .nav-secondary').show();
		$('#genesis-mobile-nav-secondary').hide();
		$('.nav-primary .quadmenu-navbar-header').hide();

		//primnary menu content collapse in

		//primnary menu header hide header
	}
	
}

(function (document, $) {

	'use strict';

	if ($("#a_to_z_widget").length > 0) {
		adjustAToZSearchBar($);
		$(window).scroll(function () { adjustAToZSearchBar($) });
		$(window).resize(function () { adjustAToZSearchBar($) });
	}

	var mainMenuButtonClass = 'menu-toggle';
	var subMenuButtonClass = 'sub-menu-toggle';

	//$(".top-header").on("main_menu.custom_click", "." + mainMenuButtonClass,
	//	function (evt) {
	//		$(".menu-toggle").toggle();
	//		$(".quadmenu-navbar-toggle").trigger("click", true);
	//		$(".quadmenu-navbar-header").css("margin-top", "-76px");
	//	});

	//$(".top-header").on("click", ".quadmenu-navbar-toggle",
	//	function (evt, isTriggered) {
	//		if (!(isTriggered))
	//		{
	//			$(".menu-toggle").click();
	//	}});

	handleMihiAudio($);

	$(document).ready(function () {
		fixPaekakarikiSpelling($);
		hackMenusForMobile($);
	});

	//$(window).on("resize", function () {
	//	hackMenusForMobile($);
	//});
	
} )( document, jQuery );
