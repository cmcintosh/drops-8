INTRODUCTION
------------

 Adds toolbar tabs to show you which Git branch you're on, a tab indicating if you're on your local environment
 and different toolbar colors for each environment in your workflow.

 * For a full description of the module, visit the project page:
   https://drupal.org/project/git_indicator

 * To submit bug reports and feature suggestions, or to track changes:
   https://drupal.org/project/issues/git_indicator


INSTALLATION
------------

Install as usual, see
 https://www.drupal.org/docs/8/extending-drupal-8/installing-contributed-modules-find-import-enable-configure-drupal-8 for further
information.


CONFIGURATION
-------------
Set the permission "View git indicator" for the desired user roles at /admin/people/permissions


LOCAL TAB
---------

To enable the Local environment tab add the following setting: $settings['is_local'] = TRUE;
to your local settings section in /sites/default/settings.php and make sure the section is uncommented:

/**
 * If there is a local settings file, then include it.
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  $settings['is_local'] = TRUE;
  include $local_settings;
}


TROUBLESHOOTING
---------------

  * The Git branch will only display if you have git initialized in the root Drupal directory.
  * The local tab will only display if you have added the above setting to your settings file.
  * If you can't see the new tabs make sure your toolbar is enabled and the user has the permission to view the toolbar and view git indicator.


MAINTAINERS
-----------

Current maintainers:

 * Codigo Vision (https://drupal.org/u/codigo-vision)
