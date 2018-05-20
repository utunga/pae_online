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

// Register Front Page 3 widget area.
genesis_register_sidebar( array(
	'id'          => 'front-page-3',
	'name'        => __( 'Front Page 3', 'pae-online' ),
	'description' => __( 'Front page 3 widget area.', 'pae-online' ),
) );

// Register Front Page 4 widget area.
genesis_register_sidebar( array(
	'id'          => 'front-page-4',
	'name'        => __( 'Front Page 4', 'pae-online' ),
	'description' => __( 'Front page 4 widget area.', 'pae-online' ),
) );

// Register Front Page 5 widget area.
genesis_register_sidebar( array(
	'id'          => 'front-page-5',
	'name'        => __( 'Front Page 5', 'pae-online' ),
	'description' => __( 'Front page 5 widget area.', 'pae-online' ),
) );
