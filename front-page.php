<?php
/**
 * Paekakariki Online.
 *
 * This file adds the front page to the Paekakariki Online Theme.
 *
 * @package   PaekakarikiOnline
 * @license   GPL-2.0+
 */

// Check if any front page widgets are active.
if (    is_active_sidebar( 'top-home' ) ||
        is_active_sidebar( 'front-page-1' ) ||
		is_active_sidebar( 'front-page-2' ) ||
		is_active_sidebar( 'sponsor-1' ) ||
		is_active_sidebar( 'sponsor-2' )) {

	// Force full-width-content layout.
	add_filter( 'genesis_pre_get_option_site_layout', '__genesis_return_full_width_content' );

	// Remove default page header.
	remove_action( 'genesis_before_content_sidebar_wrap', 'pae_onlinepage_header' );

	// Remove content-sidebar-wrap.
	add_filter( 'genesis_markup_content-sidebar-wrap', '__return_null' );

	// Remove default loop.
	remove_action( 'genesis_loop', 'genesis_do_loop' );

	add_action( 'genesis_loop', 'pae_onlinefront_page_loop' );
	/**
	 * Front page content.
	 *
	 * @since  2.0.0
	 *
	 * @return void
	 */
	function pae_onlinefront_page_loop() {

    ?>
    <div class="mihi-widget">
        <div class="wrap">
	        <div class="main"><?php
		        // Front page 1 widget area.
		        genesis_widget_area( 'mihi-area', array(
		            'before' => '<a href="/mihi/">',
		            'after'  => '</a>',
		        ) );
		        ?>
	        </div>
	        <div class="audio">
                <audio id='mihi'>
                  <source src="wp-content/uploads/2018/08/MihiKarlFarrell.mp3">
                </audio>
                <button type="button" class="btn">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-1x fa-volume-up audio_icon"></i>
                  </span>
                </button>
            </div>
        </div>
    </div>
    
    <div class="front-page-2 widget-area events">
    <div class="wrap">
        <div class="title"><h3><?php the_field( 'calendar_title'); ?></h3></div>
        <?php // events widget expected here 
	    genesis_widget_area( 'front-page-2', array(
	        'before' => '<div class="events-widget">',
	        'after'  => '</div>',
	    ) );
        ?>
    </div>
    </div>

    <?php
    // parallax home page image
	$img_url = img_asset_url("2017-10-21_Coote_008.jpg");
	echo do_shortcode( '[dd-parallax img="'.$img_url.'" speed="3" z-index="-100" mobile="'.$img_url.'"  offset="true"]' );

    do_homepage_featured_posts();

	// parallax home page image
	$img_url = img_asset_url("a_z_banner.jpg");
    echo do_shortcode( '[dd-parallax img="'.$img_url.'" speed="3" z-index="-100" mobile="'.$img_url.'" offset="true"]' );

     ?>

    <div class="front-page-4 widget-area">
    <div class="wrap">
        <div class="directory_category_list">
            <div class="wrap">
                <div class="intro_area">
                    <div class="title"><h2><?php the_field( 'directory_title'); ?></h2></div>
                    <div class="intro_text"><?php the_field( 'directory_intro'); ?></div>
                </div>
                <?php the_widget('EverythingDirectory_Category_List_Widget');  ?>
            </div>
        </div>
    </div>
    </div>

    <div class="sponsor">
    <div class="wrap">
        <div class="intro_area">
            <div class="title"><h2><?php the_field( 'sponsors_title'); ?></h2></div>
            <div class="intro_text"><?php the_field( 'sponsors_intro'); ?></div>
        </div>
        <ul>
        <?php

	        genesis_widget_area( 'sponsor-1', array(
	            'before' => '<li class="sponsor-1 widget-area">',
	            'after'  => '</li>',
	        ) );

	        genesis_widget_area( 'sponsor-2', array(
	            'before' => '<li class="sponsor-2 widget-area">',
	            'after'  => '</li>',
	        ) );
         ?>
        </ul>
        <div class="last-row">
            <a href="/supporters/"><?php the_field( 'sponsors_button_text'); ?></a>
        </div>
    </div>
    </div>
    <?php
	}
}

add_filter( 'genesis_pre_get_option_site_layout', '__genesis_return_full_width_content' );


function render_first_post() {
    
	genesis_markup( array(
		'open'    => '<article %s>',
		'context' => 'entry',
		'params'  => array(
				'is_widget' => false,
		),
	) );

    echo "<div class='featured_story'>";
    echo "<div class='image'>";

	$image = genesis_get_image( array(
		'format'  => 'html',
		'size'    => 'large',
		'context' => 'featured-post-widget',
		'attr'    => genesis_parse_attr( 'entry-image-widget', array(
			'alt' => get_the_title(),
		) ),
	) );
	printf( '<a href="%s" class="%s">%s</a>', get_permalink(), "", wp_make_content_images_responsive( $image ) );

    echo "</div>";
    echo "<div class='content'>";

	$title = get_the_title();
	$heading =  'h3' ;
	$header = genesis_markup( array(
		'open'    => "<{$heading} %s>",
		'close'   => "</{$heading}>",
		'context' => 'entry-title',
		'content' => sprintf( '<a href="%s" class="%s">%s</a>',  get_permalink(),  "story_title",$title ),
		'params'  => array(
			'is_widget' => false,
			'wrap'      => $heading,
		),
		'echo'    => false,
	) );

	genesis_markup( array(
		'open'    => '<header %s>',
		'close'   => '</header>',
		'context' => 'entry-header',
		'params'  => array(
			'is_widget' => true,
		),
		'content' => $header,
	) );

	genesis_markup( array(
		'open'    => '<div %s>',
		'context' => 'entry-content',
		'params'  => array(
			'is_widget' => false,
		),
	) );

	the_excerpt();
					
	genesis_markup( array(
		'close'   => '</div>',
		'context' => 'entry-content',
		'params'  => array(
			'is_widget' => false,
		),
	) );

    //end 'content'
    echo "</div>";

    //end 'featured_story'
    echo "</div>";

	genesis_markup( array(
		'close'   => '</article>',
		'context' => 'entry',
		'params'  => array(
			'is_widget' => true,
		),
	) );
	
}

function render_other_post() {
    
	genesis_markup( array(
		'open'    => '<article %s>',
		'context' => 'entry',
		'params'  => array(
				'is_widget' => false,
		),
	) );

	$title = get_the_title();
	$heading =  'h4' ;
	$header = genesis_markup( array(
		'open'    => "<{$heading} %s>",
		'close'   => "</{$heading}>",
		'context' => 'entry-title',
		'content' => sprintf( '<a href="%s" class="%s">%s</a>',  get_permalink(),  "story_title",$title ),
		'params'  => array(
			'is_widget' => false,
			'wrap'      => $heading,
		),
		'echo'    => false,
	) );

	genesis_markup( array(
		'open'    => '<header %s>',
		'close'   => '</header>',
		'context' => 'entry-header',
		'params'  => array(
			'is_widget' => true,
		),
		'content' => $header,
	) );

	genesis_markup( array(
		'close'   => '</article>',
		'context' => 'entry',
		'params'  => array(
			'is_widget' => true,
		),
	) );
	
}

function render_post($first_post) {
    if ($first_post) {
        render_first_post();
    }
    else {
        render_other_post();
    }
}

function do_homepage_featured_posts() {

    // WP_Query arguments
    $args = array (
	    'post_type'              => 'post',
	    'posts_per_page'         => '4',
        'meta_key'               => 'is_featured',
        'meta_value'               => 1
    );

    // The Query
    $query = new WP_Query( $args );

    ?>
        <div class="front-page-3 widget-area our_stories"><div class="wrap">
        <h3>Our stories</h3>
    <?php
        
    // The Loop
    $first_post = true;
    if ( $query->have_posts() ) {

        $query->the_post();
        render_post($first_post);
        $first_post = false;

        ?>
        <div class="other_stories">
            <?php
            while ( $query->have_posts() ) {
		        $query->the_post();
            
                render_post($first_post);          
            }
            ?>
        </div>
        <?php
    } else {
	    echo "No stories yet";
    }
    ?>
        </div></div>
    <?php
    // Restore original Post Data
    wp_reset_postdata();
}


// Run Genesis.
genesis();
?>
