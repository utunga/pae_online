/**
 * Add any custom theme JavaScript to this file.
 */

(function(document, $){
	
	'use strict';

	var isLocked = false;
	$(window).scroll(function () {

		//var bottomOfTopBar = $('.site-header').outerHeight() + $(window).scrollTop();
		//var bottomOfMediaImage = $('.top-home .widget_media_image').offset().top + $('.top-home .widget_media_image').outerHeight();
		//var topSecondaryNav = $('.nav-secondary').offset().top;

		var topBar = $('.site-header');
		var media = $('.top-home .widget_media_image');
		var bottomOfTopBar = topBar.outerHeight() + $(window).scrollTop();
		var bottomOfMediaImage = media.outerHeight() + media.offset().top;
		var topSecondaryNav = $('.nav-secondary').offset().top;

		console.log("bottomOfTopBar:" + bottomOfTopBar + ", bottomOfMediaImage" + bottomOfMediaImage + ", scroll" + $(window).scrollTop());
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
	});


	var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
	$('header.site-header').next().css('margin-top', contentPlacement);
	$(".top-home img").load(
		function () {
			$('.nav-secondary').detach().insertBefore(".site-inner");
			var contentPlacement = $('header.site-header').position().top + $('header.site-header  ').height();
			$('header.site-header').next().css('margin-top', contentPlacement);
			$('top-home').css('margin-top', 0);
		}
	);
	
	

	//$(".top-header").stick_in_parent({ bottoming: false, spacer: false });
	//$(".site-container").stick_in_parent({ bottoming: false, spacer: false });
	//$(".site-header").stick_in_parent({ bottoming: false, spacer: false });
	//$(".nav-secondary.genesis-responsive-menu").stick_in_parent({ bottoming: false, spacer: false, topSpacing: 0 });
	 
	///**
	// * Add shrink class to header on scroll.
	// */
	//$( window ).scroll( function() {

	//	var bottomOfTopNav = $('.top-header').outerHeight(); //$('.top-header').position().top + $('.top-header').offset().top + $('.top-header').outerHeight(true);
	//	var topSecondaryNav = $('.nav-secondary').offset().top;
	//	var scroll = $(window).scrollTop();
	//	if (scroll <= bottomOfTopNav) {
	//		$('.site-header').removeClass('shrink');
	//	}
	//	else {
	//		$('.site-header').addClass('shrink');
	//	}

	//	//console.log("bottomOfTopNav:" + bottomOfTopNav + ", topSecondaryNav" + topSecondaryNav + ", scroll" + scroll);
	//	if ($(".nav-placeholder").length>0) {
	//		//console.log("::" + ($('.nav-placeholder').offset().top - scroll) + ">=" + bottomOfTopNav + "?");
	//		//console.log("xxx" + $('.nav-placeholder').offset().top);
	//		//console.log("attach");
	//		if ($('.nav-placeholder').offset().top - scroll >= bottomOfTopNav) {
	//			$(".nav-secondary").detach().appendTo(".site-header");
	//			//$(".nav-placeholder").remove();
	//		}
	//	}

	//	if (topSecondaryNav - scroll <= bottomOfTopNav) {
	//		//console.log("detach");
	//		if ($(".nav-placeholder").length==0) {
	//			$(".nav-secondary").parent().after("<div class='nav-placeholder'></div>");
	//			$(".nav-secondary").detach().appendTo(".top-header");
	//		}	
	//	}

	//} );

	///**
	// * Smooth scrolling.
	// */
	//// Select all links with hashes
	//$( 'a[href*="#"]' )

	//// Remove links that don't actually link to anything
	//.not( '[href="#"]' ).not( '[href="#0"]' )

	//// Remove WooCommerce tabs
	//.not( '[href*="#tab-"]' ).click( function ( event ) {

	//	// On-page links
	//	if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {

	//		// Figure out element to scroll to
	//		var target = $( this.hash );
	//		target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );

	//		// Does a scroll target exist?
	//		if ( target.length ) {

	//			// Only prevent default if animation is actually gonna happen
	//			event.preventDefault();
	//			$( 'html, body' ).animate( {
	//				scrollTop: target.offset().top
	//			}, 1000, function () {

	//				// Callback after animation, must change focus!
	//				var $target = $( target );
	//				$target.focus();

	//				// Checking if the target was focused
	//				if ( $target.is( ":focus" ) ) {

	//					return false;
	//				} else {

	//					// Adding tabindex for elements not focusable
	//					$target.attr( 'tabindex', '-1' );

	//					// Set focus again
	//					$target.focus();
	//				};
	//			} );
	//		}
	//	}
	//});

} )( document, jQuery );

