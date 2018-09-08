<?php
/**
 * Paekakariki Online.
 *
 * This file adds a generic attachment page - full width images
 *
 * @package   PaekakarikiOnline
 * @license   GPL-2.0+
 */
// Force full width content layout.
add_filter( 'genesis_site_layout', '__genesis_return_full_width_content' );

/** Replace the standard loop with our custom loop */
remove_action( 'genesis_loop', 'genesis_do_loop' );
add_action( 'genesis_loop', 'attachment_display' );
function attachment_display() {

        echo wp_get_attachment_image( get_the_ID(), 'large' );
        $metadata = wp_get_attachment_metadata();
        printf(
	        __( 'Full size image is %s pixels', 'twentyten' ),
	        sprintf(
		        '<a href="%1$s" title="%2$s">%3$s &times; %4$s</a>',
		        esc_url( wp_get_attachment_url() ),
		        esc_attr( __( 'Link to full-size image', 'twentyten' ) ),
		        $metadata['width'],
		        $metadata['height']
	        )
        );

}

// Run the Genesis loop.
genesis();


