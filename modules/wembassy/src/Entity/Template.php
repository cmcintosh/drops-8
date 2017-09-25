<?php

namespace Drupal\wembassy\Entity;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\Core\Config\Entity\ConfigEntityInterface;
use Drupal\Core\Entity\EntityStorageInterface;

/**
* Defines a FontPack configuration entity class.
*
* @ConfigEntityType(
*  id = "template",
*  label = @Translation("Template"),
*  handlers = {
*     "list_builder" = "Drupal\wembassy\Controller\TemplateListBuilder",
*     "form" = {
*       "default" = "Drupal\wembassy\Form\TemplateForm",
*       "add"     = "Drupal\wembassy\Form\TemplateForm",
*       "edit"     = "Drupal\wembassy\Form\TemplateForm",
*       "delete" = "Drupal\wembassy\Form\TemplateDeleteForm"
*     }
*   },
*  admin_permission = "administer wembassy_templates",
*  entity_keys = {
*    "id" = "id",
*    "status" = "status",
*  },
*  config_export = {
*    "id",
*    "status",
*    "title",
*    "entity_type",
*    "bundle",
*    "default",
*    "base_template",
*    "layout",
*    "conditions",
*    "author",
*    "author_email",
*    "author_website",
*  },
*  links = {
*    "edit-form" = "/admin/wembassy/templates/{template}/edit",
*    "delete-form" = "/admin/wembassy/templates/{template}/delete"
*  }
* )
*/
class Template extends ConfigEntityBase {
  public $id;
  public $status;
  public $title;
  public $entity_type;
  public $bundle;
  public $default;
  public $base_template;
  public $layout;
  public $conditions;
  public $author;
  public $author_email;
  public $author_website;
}
