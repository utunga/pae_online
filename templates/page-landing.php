<?php
/**
 * Paekakariki Online
 *
 * Template Name: Landing Page
 *
 * This file adds the landing page template to the Paekakariki Online Theme.
 *
 * @package   PaekakarikiOnline
 * @license   GPL-2.0+
 */

add_filter( 'body_class', 'pae_onlinelanding_page_body_class' );
/**
 * Add landing page body class to the head.
 *
 * @param  array $classes Array of body classes.
 * @return array $classes Array of body classes.
 */
function pae_onlinelanding_page_body_class( $classes ) {

	$classes[] = 'landing-page';

	return $classes;

}

add_action( 'wp_enqueue_scripts', 'pae_onlinedequeue_skip_links' );
/**
 * Dequeue Skip Links Script.
 *
 * @return void
 */
function pae_onlinedequeue_skip_links() {

	wp_dequeue_script( 'skip-links' );

}

// Remove Skip Links.
remove_action( 'genesis_before_header', 'genesis_skip_links', 5 );

// Force full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

// Remove site header elements.
remove_action( 'genesis_header', 'genesis_header_markup_open', 5 );
remove_action( 'genesis_header', 'genesis_do_header' );
remove_action( 'genesis_header', 'genesis_header_markup_close', 15 );

// Remove default page header.
remove_action( 'genesis_before_content_sidebar_wrap', 'pae_onlinepage_header' );

// Add title back (removed in /includes/header.php).
add_action( 'genesis_entry_header', 'genesis_do_post_title' );

// Remove navigation.
remove_theme_support( 'genesis-menus' );

// Remove breadcrumbs.
remove_action( 'genesis_before_loop', 'genesis_do_breadcrumbs' );

// Remove footer widgets.
remove_theme_support( 'genesis-footer-widgets' );

// Remove site footer elements.
remove_action( 'genesis_footer', 'genesis_footer_markup_open', 5 );
remove_action( 'genesis_footer', 'genesis_do_footer' );
remove_action( 'genesis_footer', 'genesis_footer_markup_close', 15 );

// Run the Genesis loop.
genesis();
