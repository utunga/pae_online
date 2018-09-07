<?php
/**
 * This file contains widget areas for the Paekakariki Online Theme.
 *
 * @package   PaekakarikiOnline
 * @license   GPL-2.0+
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {

	die;

}

// Register Front Page Top Home widget area.
genesis_register_sidebar( array(
	'id'           => 'top-home',
	'name'         => __( 'Top Home', 'pae-online' ),
	'description'  => __( 'Top Home above content.', 'pae-online' ),
) );


// Register Front Page 1 widget area.
genesis_register_sidebar( array(
	'id'           => 'mihi-area',
	'name'         => __( 'Mihi Area', 'pae-online' ),
	'description'  => __( 'Front page Mihi Area', 'pae-online' )
) );

// Register Front Page 2 widget area.
genesis_register_sidebar( array(
	'id'          => 'front-page-2',
	'name'        => __( 'Front Page 2', 'pae-online' ),
	'description' => __( 'Front page 2 widget area.', 'pae-online' ),
) );
// Sponsor 1 Position
genesis_register_sidebar( array(
	'id'          => 'sponsor-1',
	'name'        => __( 'Sponsor 1', 'pae-online' ),
	'description' => __( 'Sponsor 1 widget.', 'pae-online' ),
) );

// Sponsor 2 Position
genesis_register_sidebar( array(
	'id'          => 'sponsor-2',
	'name'        => __( 'Sponsor 2', 'pae-online' ),
	'description' => __( 'Sponsor 2 widget.', 'pae-online' ),
) );
