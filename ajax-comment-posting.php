<?php

/*
Plugin Name: Ajax Comment Posting
Plugin URI:
Description: Posts comments and validates the comment form using Ajax
Author: regua
Version: 2.0
Author URI:
*/ 

function acp_initialize() {
  $acp_url = WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__));
  wp_enqueue_script('jquery');
  wp_enqueue_script('jquery-form');
  wp_enqueue_script('ACP', $acp_url.'acp.js');
  echo '<link type="text/css" rel="stylesheet" href="'.$acp_url.'acp.css" />';
}

function acp_localize() {
  load_plugin_textdomain('acp');
  echo "<script type='text/javascript'>
   var acp_lang = ['".__('Loading...', 'acp')."',
                   '".__('Please enter your name.', 'acp')."',
                   '".__('Please enter your email address.', 'acp')."',
                   '".__('Please enter a valid email address.', 'acp')."',
                   '".__('Please enter your comment.', 'acp')."',
                   '".__('Your comment has been added.', 'acp')."',
                   '".__('ACP error!', 'acp')."'];
    var acp_path = '".WP_PLUGIN_URL.'/'.str_replace(basename( __FILE__),"",plugin_basename(__FILE__))."';
   </script>";
}

add_action('init', 'acp_initialize');
add_action('wp_head', 'acp_localize');

?>