<?php
/**
 * Paekakariki Online
 *
 * Template Name: A-Z Page
 *
 * This file adds the A-Z page to the Paekakariki Online theme
 *
 * @package   PaekakarikiOnline
 * @license   GPL-2.0+
 */

add_filter( 'body_class', 'pae_online_a_to_z_body_class' );
/**
 * Add landing page body class to the head.
 *
 * @param  array $classes Array of body classes.
 * @return array $classes Array of body classes.
 */
function pae_online_a_to_z_body_class( $classes ) {

	$classes[] = 'a-to-z-page';

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

add_filter( 'genesis_pre_get_option_site_layout', '__genesis_return_full_width_content' );

/** Replace the standard loop with our custom loop */
remove_action( 'genesis_loop', 'genesis_do_loop' );
add_action( 'genesis_loop', 'pae_online_a_to_z' );
function pae_online_a_to_z() {
    $instance = array();
    the_widget('EverythingDirectory_A_to_Z_Widget', $instance);
    
}

// Run the Genesis loop.
genesis();

?>
