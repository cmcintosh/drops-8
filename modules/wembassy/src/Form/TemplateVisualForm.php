<?php
/**
* @file contains the Visual editor for creating / editing templates.
*/

namespace Drupal\wembassy\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\wembassy\Entity\Font;
use Drupal\wembassy\Entity\FontPack;
use Drupal\Core\File\FileSystem;
use Drupal\file\Entity\File;

class TemplateVisualForm extends FormBase {

  /**
  * {@inheritdoc}
  */
  public function getFormId() {
    return 'template_visual_form';
  }

  /**
  * {@inheritdoc}
  */
  public function buildForm($form, FormStateInterface $form_state) {

  }

  /**
  * {@inheritdoc}
  */
  public function submitForm (array &$form, FormStateInterface $form_state ) {
    
  }
}
