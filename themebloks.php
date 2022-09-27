<?php
/*
    Plugin Name: BloksTheme Gutenberg Blocks
    Plugin URI: 
    Description: BloksTheme Gutenberg Blocks
    Version: 1.0
    Author: Emerson Israel Sanchez Hernandez
    Author URI: https://github.com/EmersonHdz
    License: GPL2
    License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if(!defined('ABSPATH')) exit;

/** Categorias Personalizadas */
function BloksTheme_categoria_personalizada($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'ThemeBloks', 
                'title' => 'Theme Bloks',
                'icon' => 'store'
            )
        )
    );
}
add_filter('block_categories', 'BloksTheme_categoria_personalizada', 10, 2);


/** Registrar bloques, scripts y CSS */

function BloksTheme_registrar_bloques() {

    // Si gutenberg no existe, salir
    if(!function_exists('register_block_type')) {
        return;
    }

    // Registrar los bloques en el editor
    wp_register_script(
        'BloksTheme-editor-script', // nombre unico
        plugins_url( 'build/index.js', __FILE__), // archivo con los bloques
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/index.js') // versión
    );

    // Estilos para el editor (unicamente)
    wp_register_style(
        'BloksTheme-editor-styles', // nombre
        plugins_url( 'build/index.css', __FILE__), // archivo css para el editor
        array('wp-edit-blocks'), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // Estilos para los bloques (backend y front end)
    wp_register_style(
        'BloksTheme-frontend-styles', // nombre
        plugins_url( 'build/index.css', __FILE__), // archivo css para el editor
        array(), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // Arreglo de bloques
    $blocks = [
        'boxcolor/boxes'
     
    ];

    // Recorrer bloques y agregar scripts y styles
    foreach($blocks as $block) {
        register_block_type($block, array(
            'editor_script' => 'BloksTheme-editor-script', // script principal para editor
            'editor_style' => 'BloksTheme-editor-styles', // estilos para el editor
            'style' => 'BloksTheme-frontend-styles' // estilos para el front end
        ));
    }
}
add_action('init', 'BloksTheme_registrar_bloques');