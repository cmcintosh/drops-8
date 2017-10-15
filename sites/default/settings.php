<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all envrionments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to insure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Initialize the branch setting array element.
 */
$git_head = file_get_contents('.git/HEAD');
$settings['branch'] = trim(str_replace('ref: refs/heads/', '', $git_head));

/**
 * If there is a local settings file, then include it.
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  $settings['is_local'] = TRUE;
  include $local_settings;
}

$settings['install_profile'] = 'standard';

$settings['locale_custom_strings_en'][''] = array('Apply to selected items' => 'Apply');
