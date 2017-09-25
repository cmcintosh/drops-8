<?php

namespace Drupal\wembassy\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines the payment type plugin annotation object.
 *
 * Plugin namespace: Plugin\GrapesJS\Block.
 *
 * @see plugin_api
 *
 * @Annotation
 */
 class GrapesJSPlugin extends Plugin {

   /**
    * The plugin ID.
    *
    * @var string
    */
   public $id;

   /**
    * The GrapesJS Block label.
    *
    * @ingroup plugin_translatable
    *
    * @var \Drupal\Core\Annotation\Translation
    */
   public $library;

 }
