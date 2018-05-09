<?php
/**
 * Paekakariki Online
 *
 * Template Name: Category Page
 *
 * This file adds the landing page template to the Paekakariki Online Theme.
 *
 * @package   PaekakarikiOnline
 * @license   GPL-2.0+
 */

add_filter( 'body_class', 'pae_online_category_body_class' );
/**
 * Add landing page body class to the head.
 *
 * @param  array $classes Array of body classes.
 * @return array $classes Array of body classes.
 */
function pae_online_category_body_class( $classes ) {

	$classes[] = 'category-page';

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
add_action( 'genesis_loop', 'pae_online_category_custom_loop' );
function pae_online_category_custom_loop() {

    $category = get_queried_object();
    $sub_category_ids = get_term_children($category->term_id, 'category');
    if ( empty( $sub_category_ids ) || is_wp_error( $sub_category_ids ) )
    {
        // no children - just render this category
        render_listing_widget_for_category($category, false);    
    }
    else
    {
        foreach ($sub_category_ids as $sub_category_id)
        {
        	 render_listing_widget_for_category(get_term($sub_category_id, 'category'), true);    
        }
    }
    
}

// Run the Genesis loop.
genesis();


