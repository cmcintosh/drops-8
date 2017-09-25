<?php

namespace Drupal\wembassy\Controller;

use Drupal\Core\Controller\ControllerBase;

class SiteBuilder extends ControllerBase {

  /**
  * Returns the node title.
  */
  public function layoutTitle($entity_type = "node", $entity_id) {
    $entity = entity_load($entity_type, $entity_id);
    return $entity->label;
  }

  /**
  * Returns the site builder page.
  */
  public function layoutBuilder ($entity_type = "node", $entity_id) {
    $entity = node_load($entity_id);
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder($entity_type);
    $storage = \Drupal::entityTypeManager()->getStorage($entity_type);
    $build = $view_builder->view($entity, $view_mode);
    $pluginData = $this->getGrapesJSPlugins();
    $libraries = [
      'wembassy/siteBuilder'
    ];
    $libraries = array_merge($libraries, $pluginData['library']);

    
    return [
      '#attached' => [
        'drupalSettings' => [
          'wembassy' => [
            'siteBuilder' => [
              'blocks'      => $this->getGrapesJSBlocks(),
              'components'  => $this->getGrapesJSComponents(),
              'plugins'     => $pluginData['plugins'],
              'pluginsOpts' => $pluginData['pluginsOpts'],
              'assets'      => $this->getGrapesJSAssets(),
              'devices'     => $this->getDevices(),
              'fonts'       => $this->getFonts(),
              'colors'      => $this->getColors(),
            ]
          ]
        ],
        'library' => $libraries,
      ],
      'container' => $build
    ];
  }

  /**
  * Internal function to get the defined Components.
  */
  private function getGrapesJSComponents() {
    // @TODO: This needs a bit more thought....
    return [];
  }

  /**
  * Internal function to get the defined Blocks and add them to drupalSettings
  */
  private function getGrapesJSBlocks() {
    $type = \Drupal::service('plugin.manager.grapejs_block');
    $plugin_definitions = $type->getDefinitions();

    $blockData = [];
    foreach($plugin_definitions as $definition) {
      $plugin = $type->createInstance($definition->id, []);
      $blockData[$definition->id] = [
        'label' => $plugin->getLabel(),
        'attributes' => $plugin->getAttributes(),
        'content' => $plugin->getTemplate(),
      ];
    }
    return $blockData;
  }

  /**
  * Internal function to get the plugins defined and add them to drupalSettings.
  */
  private function getGrapesJSPlugins() {
    // @TODO: Create this plugin type....
    $type = \Drupal::service('plugin.manager.grapejs_plugin');
    $plugin_definitions = $type->getDefinitions();

    $pluginData = [
      'plugins' => [],
      'pluginsOpts' => [],
      'library' => [],
    ];
    foreach($plugin_definitions as $definition) {
      $plugin = $type->createInstance($definition['id'], []);
      $pluginData['plugins'][] = $definition['id'];
      $pluginData['pluginsOpts'][] = $plugin->getOptions();
      $pluginData['library'][] = $plugin->getLibrary();
    }
    return $pluginData;
  }

  /**
  * Internal function to get Assets for grapejs.  Atm this is just images.
  */
  private function getGrapesJSAssets() {
    // @TODO create this logic....
    return [];
  }

  /**
  * Internal function to get the defined Devices or Breakpoints.
  */
  private function getDevices() {
    $entities = entity_load_multiple('breakpoint');

    $devices = [];
    foreach($entities as $entity) {
      $devices[] = [
        'name' => $entity->get('id'),
        'width' => $entity->get('width')
      ];
    }
    return $devices;
  }

  /**
  * Internal function for getting the defined fonts.
  */
  private function getFonts() {
    $entities = entity_load_multiple('font');

    $fonts = [];
    foreach($entities as $entity) {
      $fonts[] = [
        'value' => $entity->get('name'),
        'name' => $entity->get('name'),
        'class' => 'wem-font-' . $entity->get('id')
      ];
    }
    return $fonts;
  }

  /**
  * Internal function for getting the defined colors.
  */
  private function getColors() {
    $entities = entity_load_multiple('color');

    $colors = [];
    foreach($entities as $entity) {
      $colors[] = [
        'value' => $entity->get('name'),
        'name' => $entity->get('name'),
        'class' => 'wem-color-' . $entity->get('id')
      ];
    }
    return $colors;
  }

}
