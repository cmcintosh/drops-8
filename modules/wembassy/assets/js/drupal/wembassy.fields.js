(function($, Drupal) {
  grapesjs.plugins.add('drupal-fields', function(editor, opts) {
    let config = opts;

    var domComponents = editor.DomComponents;

    var meta = domComponents.addComponent({
      tagName: 'meta',
      removable: false, // Can't remove it
      draggable: false,
      copyable: false, // Disable copy/past
      hiddenLayer: true,
      content: '',
    });

    var link = domComponents.addComponent({
      tagName: 'link',
      removable: false, // Can't remove it
      draggable: false,
      copyable: false, // Disable copy/past
      hiddenLayer: true,
      content: '',
      attributes: { 'rel': '', 'href':'' }
    });

    var script = domComponents.addComponent({
      tagName: 'script',
      removable: false, // Can't remove it
      draggable: false,
      copyable: false, // Disable copy/past
      hiddenLayer: true,
      content: '',
      attributes: { 'type': '', 'src': ''}
    });

    var field = domComponents.addComponent({
      tagName: 'field',
      removable: true,
      draggable: 'row, cell, li, a, td, strong, em, h1, h2, h3, h4, h5, h6',
      droppable: false,
      copyable: true, // Disable copy/past
      content: '{{  }}', // Text inside component
      attributes: { 'data-field': '' }
    });

    // Loop through the defined fields and create blocks for them.
    var blockManager = editor.BlockManager;

    for(var i in drupalSettings.wembassy.siteBuilder.fields) {
      var field = drupalSettings.wembassy.siteBuilder.fields[i];

      if (field.value !== '' && field.value !== null) {
        blockManager.add(field.id, {
          label: field.label,
          content: '<field data-field="' + field.id + '"><span>' + field.value + '</span></field>',
          category: 'Fields'
        });
      }
    }


  });
})(jQuery, Drupal);
