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

// Enable support for post formats.
add_theme_support( 'post-formats', array(
	'aside',
	'audio',
	'chat',
	'gallery',
	'image',
	'link',
	'quote',
	'status',
	'video',
) );

// Enable support for post thumbnails.
add_theme_support( 'post-thumbnails' );

// Enable support for selective refresh and Customizer edit icons.
add_theme_support( 'customize-selective-refresh-widgets' );

// Enable support for custom background image.
add_theme_support( 'custom-background', array(
	'default-color' => 'f4f5f6',
) );

// Enable support for logo option in Customizer > Site Identity.
add_theme_support( 'custom-logo', array(
	'height'      => 60,
	'width'       => 240,
	'flex-height' => true,
	'flex-width'  => true,
	'header-text' => array( '.site-title', '.site-description' ),
) );

// Display custom logo in site title area.
add_action( 'genesis_site_title', 'the_custom_logo', 0 );

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
		'mainMenu'         => __( 'Menu', 'pae-online' ),
		'subMenu'          => __( 'Menu', 'pae-online' ),
		'menuIconClass'    => null,
		'subMenuIconClass' => null,
		'menuClasses'      => array(
			'combine' => array(
				'.nav-primary',
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

/*
 * Limit the excerpt by character.
 *
 * @link Reference - http://codex.wordpress.org/Function_Reference/get_the_excerpt
 */
function the_excerpt_max_charlength($charlength) {
	$excerpt = get_the_excerpt();
	$charlength++;
	if ( mb_strlen( $excerpt ) > $charlength ) {
		$subex = mb_substr( $excerpt, 0, $charlength - 5 );
		$exwords = explode( ' ', $subex );
		$excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
		if ( $excut < 0 ) {
			echo mb_substr( $subex, 0, $excut );
		} else {
			echo $subex;
		}
		echo ' <br><a href="' . get_permalink() . '" class="more-link" title="Read More">Read More</a>';
	} else {
		echo $excerpt;
	}
}

function pae_online_banner_header($image, $title, $sub_text) {
    $image_Url =  $image['url'];
    if ($image_Url)
    {
    ?>
	<script>
        jQuery(document).ready(function($) {
                jQuery(".banner_header").backstretch("<?php echo $image_Url ?>");
                $('.backstretch img').each(function(i, el) {
                    $(el).addClass("wpsmartcrop-image");
                });
        });
	</script>
        <style>
			.banner_header {
				height: 26rem
			}
			
        </style>
    <?php
    }

    ?>
    <div class='banner_header'>
		<div class="wrap">
			<div class="transparent_bit">
				<h1><?php echo $title; ?></h1>
				<p><?php echo $sub_text; ?></p>
			</div>
		</div>
    </div>
    <?php
}
