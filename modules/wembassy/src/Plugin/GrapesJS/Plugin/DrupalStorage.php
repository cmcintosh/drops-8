<?php

namespace Drupal\wembassy\Plugin\GrapesJS\Plugin;

use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginBase;
use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginInterface;

/**
* @GrapesJSPlugin(
*   id = "drupal-storage",
*   library = "wembassy/drupalStorage"
* )
*/
class DrupalStorage extends GrapesJSPluginBase implements GrapesJSPluginInterface {

    /**
    * Return the DOM Element for this component.
    */
    public function getLibrary() {
      return $this->pluginDefinition['library'];
    }

    /**
    * Return preconfigured options for the plugin.
    */
    public function getOptions() {
      return [ ];
    }

    /**
    *
    */
    public function drupalSettings($entity_type, $bundle, $entity) {

      // Get template suggestions for the current page.
      $path = \Drupal::service('path.current')->getPath();
      $path_args = explode('/', $path);
      $a = array_shift($path_args); // first is blank
      array_pop($path_args); // Remove layout
      $suggestions = ['page'] + theme_get_suggestions($path_args, 'page', '__');

      $config = \Drupal::config('system.theme');
      $current_theme = $config->get('default');
      $theme_path = drupal_get_path('theme', $current_theme);
      $existing_templates = [];
      foreach($suggestions as $suggestion) {
        if ($this->templateExists($theme_path, $suggestion . '.html.twig')) {
          $existing_templates[] = $suggestion . '.html.twig';
        }
        else if ($entity = entity_load('template', $suggestion . '.html.twig')) {
          $existing_templates[] = $suggestion . '.html.twig';
        }
      }

      return [
        'current_theme' => $current_theme,
        'suggestions' => $suggestions,
        'existing_templates' => $existing_templates,
        'inherit_base_theme' => (count($existing_templates) < 1),
        'current_template' => count($existing_templates) > 1 ? $existing_templates[count($existing_templates)-1] : $existing_templates[0]
      ];
    }

    /**
    * Used to scan a theme for the provides templates.
    */
    private function templateExists($theme_path, $template, $returnPath = FALSE) {
      $oDirectory = new \RecursiveDirectoryIterator($theme_path);
      $oIterator = new \RecursiveIteratorIterator($oDirectory);
      foreach($oIterator as $oFile) {
          if ($oFile->getFilename() == $template) {
            if($returnPath) {
              return $oFile->getPath();
            }
             return TRUE;
          }
      }
      return FALSE;
    }

}
