<?php

namespace Drupal\dragon\Plugin\GrapesJS\Plugin;

use Drupal\dragon\Plugin\GrapesJS\Plugin\GrapesJSPluginBase;
use Drupal\dragon\Plugin\GrapesJS\Plugin\GrapesJSPluginInterface;

/**
* @GrapesJSPlugin(
*   id = "drupal-blocks",
*   library = "dragon/drupalBlocks"
* )
*/
class DrupalBlocks extends GrapesJSPluginBase implements GrapesJSPluginInterface {

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

    // @TODO: find a way to return rendered blocks via an ajax call.

    /**
    * Return all of the defined drupal fields.
    */
    public function drupalSettings() {
      $blocks = [];

      $type = \Drupal::service('plugin.manager.block');
      $plugin_definitions = $type->getDefinitions();

      foreach($plugin_definitions as $id => $definition) {
        $plugin = $type->createInstance($id, []);
        $blocks[$id] = [
          'id' => $id,
          'label' => $definition['admin_label'],
          'value' => render($plugin->build()),
        ];
      }
      return [
        'drupalBlocks' => $blocks
      ];
    }

}
