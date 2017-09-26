<?php

namespace Drupal\wembassy\Plugin\GrapesJS\Plugin;

use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginBase;
use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginInterface;

/**
* @GrapesJSPlugin(
*   id = "gjs-plugin-export",
*   library = "wembassy/grapesjs-export"
* )
*/
class Export extends GrapesJSPluginBase implements GrapesJSPluginInterface {

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
