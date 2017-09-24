<?php

namespace Drupal\wembassy\Controller;

use Drupal\Core\Controller\ControllerBase;

class SiteBuilder extends ControllerBase {

  /**
  * Returns the node title.
  */
  public function nodeTitle($node) {
    $entity = node_load($node);
    return $entity->get('title')->value;
  }

  /**
  * Returns the site builder page.
  */
  public function nodeLayout ($node) {
    $entity = node_load($node);
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder("node");
    $storage = \Drupal::entityTypeManager()->getStorage("node");
    $build = $view_builder->view($entity, $view_mode);


    return [
      '#attached' => [
        'library' => [
          'wembassy/siteBuilder'
        ],
        'drupalSettings' => [
          'wembassy' => [
            'siteBuilder' => [
              'preview' => $output
            ]
          ]
        ]
      ],
      'container' => $build
    ];
  }

}
