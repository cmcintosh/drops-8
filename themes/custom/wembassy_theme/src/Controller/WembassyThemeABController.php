<?php

namespace Drupal\wembassy_theme\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\dragon\Entity\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class WembassyThemeABController extends ControllerBase {

  public function overview() {

    return [
      '#markup' => 'coming soon'
    ];
  }

}

?>
