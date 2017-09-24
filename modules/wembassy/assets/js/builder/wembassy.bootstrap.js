// Creates bootstrap components, blocks, and assets for grapesjs
export default grapesjs.plugins.add('wembassy-bootstrap', (editor, options) => {

  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const blockManager = editor.BlockManager;

  /**
  * Bootstrap Grid system.
  */
  blockManager.add('bootstrap-container', {
    label: 'Container',
    attributes: { },
    content: '<div class="container"> </div>',
    category: 'Container',
  });

  blockManager.add('bootstrap-container-fluid', {
    label: 'Fluid Container',
    attributes: { },
    content: '<div class="container-fluid"> </div>',
    category: 'Container',
  });

  blockManager.add('bootstrap-row', {
    label: 'Row',
    attributes: { },
    content: '<div class="row"></div>',
    category: 'Container',
  });

  blockManager.add('bootstrap-col-12', {
    label: 'Column 12',
    attributes: { },
    content: '<div class="col-sm-12"></div>',
    category: 'Grid',
  });

  blockManager.add('bootstrap-col-10', {
    label: 'Column 10',
    attributes: { },
    content: '<div class="col-sm-10"></div>',
    category: 'Grid',
  });

  blockManager.add('bootstrap-col-8', {
    label: 'Column 8',
    attributes: { },
    content: '<div class="col-sm-8"></div>',
    category: 'Grid',
  });

  blockManager.add('bootstrap-col-6', {
    label: 'Column 6',
    attributes: { },
    content: '<div class="col-sm-6"></div>',
    category: 'Grid',
  });

  blockManager.add('bootstrap-col-4', {
    label: 'Column 4',
    attributes: { },
    content: '<div class="col-sm-4"></div>',
    category: 'Grid',
  });

  blockManager.add('bootstrap-col-2', {
    label: 'Column 2',
    attributes: { },
    content: '<div class="col-sm-2"></div>',
    category: 'Grid',
  });

  // Headings
  blockManager.add('bootstrap-h1', {
    label: 'H1',
    attributes: { 'class': 'h1' },
    content: '<h1>Heading</h1>',
    category: 'Headers',
  });

  blockManager.add('bootstrap-h2', {
    label: 'H2',
    attributes: { 'class': 'h2' },
    content: '<h2>Heading</h2>',
    category: 'Headers',
  });

  blockManager.add('bootstrap-h3', {
    label: 'H3',
    attributes: { 'class': 'h3' },
    content: '<h3>Heading</h3>',
    category: 'Headers',
  });

  blockManager.add('bootstrap-h4', {
    label: 'H4',
    attributes: { 'class': 'h4' },
    content: '<h4>Heading</h4>',
    category: 'Headers',
  });

  blockManager.add('bootstrap-lead', {
    label: 'Lead',
    attributes: { },
    content: '<p class="lead">Curabitur vestibulum nibh ac eros dictum, quis egestas dui commodo. Fusce hendrerit et ante et ullamcorper. Curabitur augue leo, dictum non interdum id, facilisis at est. Fusce gravida magna non enim egestas, a maximus nisi dapibus. Mauris finibus ligula eu sodales sodales. Cras aliquet lorem quis nisl fermentum, non ullamcorper lorem cursus. Nullam semper ligula quis orci tempor, maximus facilisis sapien hendrerit.</p>',
    category: 'Elements',
  });

  blockManager.add('bootstrap-alert-primary', {
    label: 'Primary',
    attributes: { },
    content: '<div class="alert alert-primary" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-secondary', {
    label: 'Secondary',
    attributes: { },
    content: '<div class="alert alert-secondary" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-success', {
    label: 'Success',
    attributes: { },
    content: '<div class="alert alert-sucess" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-danger', {
    label: 'Danger',
    attributes: { },
    content: '<div class="alert alert-danger" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-warning', {
    label: 'Warning',
    attributes: { },
    content: '<div class="alert alert-warning" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-info', {
    label: 'Info',
    attributes: { },
    content: '<div class="alert alert-info" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-light', {
    label: 'Light',
    attributes: { },
    content: '<div class="alert alert-light" role="alert"> This is a alert—check it out! </div>',
    category: 'Notification',
  });

  blockManager.add('bootstrap-alert-dark', {
    label: 'Dark',
    attributes: { },
    content: '<div class="alert alert-dark alert-dismissible fade show" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>This is a alert—check it out!</div>',
    category: 'Notification',
  });

  // Badges
  blockManager.add('bootstrap-badge-primary', {
    label: 'Primary',
    attributes: { },
    content: '<span class="badge badge-primary">Primary</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-secondary', {
    label: 'Secondary',
    attributes: { },
    content: '<span class="badge badge-secondary">Secondary</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-success', {
    label: 'Success',
    attributes: { },
    content: '<span class="badge badge-success">Success</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-danger', {
    label: 'Danger',
    attributes: { },
    content: '<span class="badge badge-danger">Danger</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-warning', {
    label: 'Warning',
    attributes: { },
    content: '<span class="badge badge-warning">Warning</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-info', {
    label: 'Warning',
    attributes: { },
    content: '<span class="badge badge-info">Info</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-light', {
    label: 'Light',
    attributes: { },
    content: '<span class="badge badge-light">Light</span>',
    category: 'Badge',
  });

  blockManager.add('bootstrap-badge-dark', {
    label: 'Dark',
    attributes: { },
    content: '<span class="badge badge-dark">Dark</span>',
    category: 'Badge',
  });

});
