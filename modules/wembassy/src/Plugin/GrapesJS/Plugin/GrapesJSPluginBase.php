<?php

namespace Drupal\wembassy\Plugin\GrapesJS\Plugin;

use Drupal\Core\Plugin\PluginBase;
use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginInterface;

/**
* Provides the base GrapeJS Block type class.
*/
abstract class GrapesJSPluginBase extends PluginBase implements GrapesJSPluginInterface {

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
      return [];
    }

}
