<?php

namespace Drupal\wembassy\Plugin\GrapesJS\Plugin;

use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginBase;
use Drupal\wembassy\Plugin\GrapesJS\Plugin\GrapesJSPluginInterface;

/**
* @GrapesJSPlugin(
*   id = "drupal-fields",
*   library = "wembassy/drupalFields"
* )
*/
class DrupalFields extends GrapesJSPluginBase implements GrapesJSPluginInterface {

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
    * Return all of the defined drupal fields.
    */
    public function drupalSettings($entity_type, $bundle, $entity) {
      $bundle_fields = \Drupal::entityManager()->getFieldDefinitions($entity_type, $bundle);
      $fields = [];
      foreach($bundle_fields as $id => $field) {
        $fields[] = [
          'id' => $id,
          'label' => $field->getLabel(),
          'value' => render($entity->get($id)->view('default'))
        ];
      }

      $fields[] = [
        'id' => 'body',
        'label' => 'Body',
        'value' => render($entity->get('body')->view('default'))
      ];
      return [
        'fields' => $fields,
      ];
    }

}
