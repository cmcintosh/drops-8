<?php

namespace Drupal\wembassy\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\wembassy\Entity\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

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
  public function layoutBuilder ($view_mode = 'default', $entity_type = "node", $entity_id) {
    $entity = node_load($entity_id);
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder($entity_type);
    $storage = \Drupal::entityTypeManager()->getStorage($entity_type);
    $build = $view_builder->view($entity, $view_mode);
    $pluginData = $this->getGrapesJSPlugins($entity_type, $entity->bundle(), $entity);
    $libraries = [
      'wembassy/siteBuilder'
    ];
    $libraries = array_merge($libraries, $pluginData['library']);


    $settings = [
      'entity_type'      => $entity_type,
      'bundle'           => $entity->bundle(),
      'blocks'           => $this->getGrapesJSBlocks(),
      'components'       => $this->getGrapesJSComponents(),
      'plugins'          => $pluginData['plugins'],
      'pluginsOpts'      => $pluginData['pluginsOpts'],
      'assets'           => $this->getGrapesJSAssets(),
      'devices'          => $this->getDevices(),
      'fonts'            => $this->getFonts(),
      'colors'           => $this->getColors(),
      'current_template' => 'page.html.twig'
    ];

    $settings += $pluginData['drupalSettings'];

    return [
      '#attached' => [
        'drupalSettings' => [
          'wembassy' => [
            'siteBuilder' => $settings
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
  private function getGrapesJSPlugins($entity_type, $bundle, $entity) {
    // @TODO: Create this plugin type....
    $type = \Drupal::service('plugin.manager.grapejs_plugin');
    $plugin_definitions = $type->getDefinitions();

    $pluginData = [
      'plugins' => [],
      'pluginsOpts' => [],
      'library' => [],
      'drupalSettings' => [],
    ];
    foreach($plugin_definitions as $definition) {
      $plugin = $type->createInstance($definition['id'], []);
      $pluginData['plugins'][] = $definition['id'];
      $pluginData['pluginsOpts'][] = $plugin->getOptions();
      $pluginData['library'][] = $plugin->getLibrary();
      $settings = $plugin->drupalSettings($entity_type, $bundle, $entity);
      foreach($settings as $id => $setting) {
        $pluginData['drupalSettings'][$id] = $setting;
      }

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

  /**
  * End point to get data from the builder.
  */
  public function saveGrapesJS(Request $request) {
    $template_id = $request->request->get('template');
    $data = $request->request->get('data');
    $entity_type = $request->request->get('entity_type');
    $bundle = $request->request->get('bundle');

    if ($entity = entity_load('template', $template_id)){

    }
    else {
      $entity = Template::create([
        'id' => $request->request->get('template'),
        'layout' => $request->request->get('data'),
        'default' => $request->request->get('default'),
        'status' => $request->request->get('status'),
      ]);
      $entity->set('entity_type', $request->request->get('entity_type'));
      $entity->set('bundle', $request->request->get('bundle'));
    }

    try {
      if ($entity->save()) {
        return new JsonResponse([
          'success' => 1
        ]);
      }
      else {
        return new JsonResponse([
          'success' => 0
        ]);
      }
    }
    catch (\Exception $e) {
      watchdog_exception('wembassy', $e);
      return new JsonResponse([
        'success' => 0
      ]);
    }
  }

  /**
  * End point to load data from drupal for the builder.
  */
  public function loadGrapesJS(Request $request) {
    $template_id = $request->request->get('template');
    $entity = entity_load('template', $template_id);
    return new JsonResponse(['data' => $entity->get('layout')]);
  }

  /**
  * End point to return html for a block.
  */
  public function returnBlock(Request $request) {
    $entity = entity_load('block', $request->request->get('block_id'));
    $display = \Drupal::entityTypeManager()
      ->getViewBuilder('block')
      ->view($entity);
    return new JsonResponse([
      'content' => render($display)
    ]);
  }
}
