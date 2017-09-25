<?php

namespace Drupal\wembassy\Plugin\GrapesJS\Plugin;

/**
* Defines the interface for the GrapeJS Block.
* @see https://github.com/artf/grapesjs/wiki/Components
*/
interface GrapesJSPluginInterface {

  /**
  * Returns the library that contains the plugin.
  */
  public function getLibrary();

}
