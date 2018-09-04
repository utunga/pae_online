<?php
/**
 * Paekakariki Online Theme.
 *
 * @package      PaekakarikiOnline
 * @license      GPL-2.0+
 */


 // If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {

	die;

}
    // Check if a google_maps_api_key is defined
    function my_acf_google_map_api( $api ){
        if (defined( 'GOOGLE_MAPS_API_KEY' )) {
    	    $api['key'] = GOOGLE_MAPS_API_KEY;
	    }    
   	    return $api;
    }
    add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

/**
 * Enable ACF 5 early access
 * Requires at least version ACF 4.4.12 to work
 */
define('ACF_EARLY_ACCESS', '5');

// Child theme (do not remove).
include_once( get_template_directory() . '/lib/init.php' );

// Define theme constants.
define( 'CHILD_THEME_NAME', 'Paekakariki Online' );
define( 'CHILD_THEME_URL', 'https://paekakariki.online' );
define( 'CHILD_THEME_VERSION', '0.5.5' );

// Set Localization (do not remove).
load_child_theme_textdomain( 'pae-online', apply_filters( 'child_theme_textdomain', get_stylesheet_directory() . '/languages', 'pae-online' ) );

// ogg files are not allowed by default????
define('ALLOW_UNFILTERED_UPLOADS', true);


// Remove secondary sidebar.
unregister_sidebar( 'sidebar-alt' );

// Remove unused site layouts.
genesis_unregister_layout( 'content-sidebar-sidebar' );
genesis_unregister_layout( 'sidebar-content-sidebar' );
genesis_unregister_layout( 'sidebar-sidebar-content' );

// Enable support for page excerpts.
add_post_type_support( 'page', 'excerpt' );

// Enable shortcodes in text widgets.
add_filter( 'widget_text', 'do_shortcode' );


// Enable support for WooCommerce and WooCommerce features.
add_theme_support( 'woocommerce' );
add_theme_support( 'wc-product-gallery-zoom' );
add_theme_support( 'wc-product-gallery-lightbox' );
add_theme_support( 'wc-product-gallery-slider' );

// Enable support for structural wraps.
add_theme_support( 'genesis-structural-wraps', array(
	'header',
	'menu-primary',
	'menu-secondary',
	'footer-widgets',
	'footer',
) );

// Enable support for Accessibility enhancements.
add_theme_support( 'genesis-accessibility', array(
	'404-page',
	'drop-down-menu',
	'headings',
	'rems',
	'search-form',
	'skip-links',
) );

// Enable support for custom navigation menus.
add_theme_support( 'genesis-menus' , array(
	'primary'   => __( 'Header Menu', 'pae-online' ),
	'secondary' => __( 'After Header Menu', 'pae-online' ),
) );

// Enable support for viewport meta tag for mobile browsers.
add_theme_support( 'genesis-responsive-viewport' );

// Enable support for Genesis footer widgets.
add_theme_support( 'genesis-footer-widgets', 3 );

// Enable support for Gutenberge wide images.
add_theme_support( 'gutenberg', array(
	'wide-images' => true,
) );

// Enable support for default posts and comments RSS feed links.
add_theme_support( 'automatic-feed-links' );

// Enable support for HTML5 markup structure.
add_theme_support( 'html5', array(
	'caption',
	'comment-form',
	'comment-list',
	'gallery',
	'search-form',
) );

//// Enable support for post formats.
//add_theme_support( 'post-formats', array(
//    'aside',
//    'audio',
//    'chat',
//    'gallery',
//    'image',
//    'link',
//    'quote',
//    'status',
//    'video',
//) );

// Enable support for post thumbnails.
add_theme_support( 'post-thumbnails' );
add_image_size('banner', 1200, 800, true); // width, height, crop
add_image_size('banner-wide', 1200, 315, true); // width, height, crop

// Enable support for selective refresh and Customizer edit icons.
add_theme_support( 'customize-selective-refresh-widgets' );

// Enable support for custom background image.
add_theme_support( 'custom-background', array(
	'default-color' => 'f4f5f6',
) );


// define the get_terms_orderby callback 
function filter_get_terms_orderby( $orderby, $this_query_vars, $this_query_vars_taxonomy ) { 
    return "slug"; 
}; 
add_filter( 'get_terms_orderby', 'filter_get_terms_orderby', 10, 3 );

// replace title with custom markup 
remove_action( 'genesis_site_title', 'genesis_seo_site_title' );
add_action( 'genesis_site_title', 'paeonline_site_title' );
/**
 * Replace title, with mark up easier to override 
 */
function paeonline_site_title() { 

    //<div class="title-area" itemscope="itemscope" itemtype="http://schema.org/Organization"><p class="site-title" itemprop="name"><a href="//localhost:8000/">Paekākāriki Online</a></p><p class="site-description" itemprop="description">Your pocket universe</p></div>
    $url =  trailingslashit( home_url() );
    $blog_title = get_bloginfo( 'name' );

    $theme_root = get_stylesheet_directory_uri();
    $logo_mobile = $theme_root . "/assets/images/logo_mobile.png";
    $logo_desktop =  $theme_root . "/assets/images/logo_desktop.png";

    $logo_desktop_img = sprintf('<img src="%s" class="logo_desktop" title="%s" alt="%s" />', $logo_desktop, $blog_title, $blog_title);
    $logo_mobile_img = sprintf('<img src="%s" class="logo_mobile" title="%s" alt="%s" />', $logo_mobile, $blog_title, $blog_title);

    echo sprintf( '
        <a href="%s">
            %s
            %s
            <p class="site-title" itemprop="name"><span class="title-text">%s</span></p>
        </a>',  $url, $logo_desktop_img, $logo_mobile_img, $blog_title);
}


// Enable support for custom header image or video.
add_theme_support( 'custom-header', array(
	'header-selector'    => '.hero',
	'default_image'      => get_stylesheet_directory_uri() . '/assets/images/hero.jpg',
	'header-text'        => true,
	'default-text-color' => '30353a',
	'width'              => 1920,
	'height'             => 1080,
	'flex-height'        => true,
	'flex-width'         => true,
	'uploads'            => true,
	'video'              => true,
	'wp-head-callback'   => 'pae_onlinecustom_header',
) );

add_theme_support( 'fixed-header' );

// Register a custom layout.
genesis_register_layout( 'custom-layout', array(
	'label' => __( 'Custom Layout', 'pae-online' ),
	'img'   => get_stylesheet_directory_uri() . '/assets/images/custom-layout.gif',
) );

// Change order of main stylesheet to override plugin styles.
remove_action( 'genesis_meta', 'genesis_load_stylesheet' );
add_action( 'wp_enqueue_scripts', 'genesis_enqueue_main_stylesheet', 99 );

// Reposition primary navigation menu.
remove_action( 'genesis_after_header', 'genesis_do_nav' );
add_action( 'genesis_after_title_area', 'genesis_do_nav' );

// Reposition the secondary navigation menu.
remove_action( 'genesis_after_header', 'genesis_do_subnav' );
add_action( 'genesis_after_header_wrap', 'genesis_do_subnav' );

// Reposition footer widgets inside site footer.
remove_action( 'genesis_before_footer', 'genesis_footer_widget_areas' );
add_action( 'genesis_before_footer_wrap', 'genesis_footer_widget_areas', 5 );

add_action( 'wp_enqueue_scripts', 'pae_onlinescripts_styles', 99 );
/**
 * Enqueue theme scripts and styles.
 *
 * @return void
 */
function pae_onlinescripts_styles() {

	// Remove Simple Social Icons CSS (included with theme).
	wp_dequeue_style( 'simple-social-icons-font' );

	// Google fonts.
	wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700', array(), CHILD_THEME_VERSION );

	// Conditionally load WooCommerce styles.
	if ( pae_onlineis_woocommerce_page() ) {

		wp_enqueue_style( 'pae-online-woocommerce', get_stylesheet_directory_uri() . '/assets/styles/min/woocommerce.min.css', array(), CHILD_THEME_VERSION );

	}

	// Check if debugging is enabled.
	$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : 'min.';
	$folder = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : 'min/';



	// Enqueue responsive menu script.
	wp_enqueue_script( 'pae-online', get_stylesheet_directory_uri() . '/assets/scripts/' . $folder . 'scripts.' . $suffix . 'js', array( 'jquery' ), CHILD_THEME_VERSION, true );

	// Localize responsive menu script.
	wp_localize_script( 'pae-online', 'genesis_responsive_menu', array(
		'mainMenu'         => __( '', 'pae-online' ),
		'subMenu'          => __( '', 'pae-online' ),
		'menuIconClass'    => null,
		'subMenuIconClass' => null,
		'menuClasses'      => array(
			'combine' => array(
				'.nav-secondary',
			),
		),
	) );
}

//* Enable the superfish script
add_filter( 'genesis_superfish_enabled', '__return_true' );

// Load helper functions.
include_once( get_stylesheet_directory() . '/includes/helpers.php' );

// Load miscellaneous functions.
include_once( get_stylesheet_directory() . '/includes/extras.php' );

// Load widget areas.
include_once( get_stylesheet_directory() . '/includes/widgets.php' );

// Load page header.
include_once( get_stylesheet_directory() . '/includes/header.php' );

// Load Customizer settings.
include_once( get_stylesheet_directory() . '/includes/customize.php' );

// Load default settings.
include_once( get_stylesheet_directory() . '/includes/defaults.php' );

// Load recommended plugins.
include_once( get_stylesheet_directory() . '/includes/plugins.php' );


/** ------------------------------------ **/

function img_asset_url($asset_file) {
    return get_stylesheet_directory_uri() . "/assets/images/" . $asset_file;
}

add_action( 'genesis_before_header_wrap', 'pae_onlinepage_top_header' );
function pae_onlinepage_top_header() {
?>
	<div class="top-header">
        <?php
}


add_action( 'genesis_after_header', 'pae_online_after_menu_secondary_wrap', 6 );
function pae_online_after_menu_secondary_wrap() {
    if ( is_front_page() ) {
        genesis_widget_area( 'top-home', array(
            'before' => '<div class="top-home">',
            'after'  => '</div>',
        ) );
    }
    ?>
    </div>
<?php
}

add_filter( 'wp_nav_menu_items', 'pae_online_menu_extras', 10, 2 );
function pae_online_menu_extras( $menu, $args ) {
	//* Change 'primary' to 'secondary' to add extras to the secondary navigation menu
	if ( 'secondary' !== $args->theme_location )
		return $menu;

	ob_start();
	get_search_form();
	$search = ob_get_clean();
	$menu  .= '<li class="right search">' . $search . '</li>';

	return $menu;
}

function pae_online_excerpt($excerpt) {
    
    global $post;
    if ( has_excerpt( $post->ID ) ) {
        return $excerpt;
    } else {
        return "";
    }
}
add_filter( 'the_excerpt', 'pae_online_excerpt', 10, 1 );


function abs_path_to_url( $path = '' ) {
    $url = str_replace(
        wp_normalize_path( untrailingslashit( ABSPATH ) ),
        site_url(),
        wp_normalize_path( $path )
    );
    return esc_url_raw( $url );
}

function pae_image_resize( $file, $max_w, $max_h, $crop = false, $jpeg_quality = 90 ) {
    
    $editor = wp_get_image_editor( $file );
    if ( is_wp_error( $editor ) )
        return $editor;
    $editor->set_quality( $jpeg_quality );
 
    $resized = $editor->resize( $max_w, $max_h, $crop );
    if ( is_wp_error( $resized ) )
        return $resized;
 
    $dest_file = $editor->generate_filename();
    $saved = $editor->save( $dest_file );
    if ( is_wp_error( $saved ) )
       return $saved;
 
    return abs_path_to_url($dest_file);
}

function pae_online_banner_header($image_id, $title) {

    $image_attributes = wp_get_attachment_image_src($image_id, 'banner');
    $image_url =  $image_attributes[0];
    $image_file = get_attached_file($image_id);
    $wide_image_url = pae_image_resize($image_file, 1200, 515, true);
    $wide_image_url = (is_wp_error($wide_image_url) ? $image_url : $wide_image_url);

    if ($image_url)
    {
    ?>
        <script>
            jQuery(document).ready(function($) { 
                    jQuery(".pae_online_banner_header").backstretch("<?php echo $image_url ?>");
                    jQuery(".pae_online_banner_header img").addClass("wpsmartcrop-image");
                    jQuery(".pae_online_banner_header_wide").backstretch("<?php echo $wide_image_url ?>");
                    jQuery(".pae_online_banner_header_wide img").addClass("wpsmartcrop-image");
            });
        </script>
        <div class='pae_online_banner_header'>
            
        </div>
        <div class='pae_online_banner_header_wide'>
            
        </div>
      
    <?php
    }
}
