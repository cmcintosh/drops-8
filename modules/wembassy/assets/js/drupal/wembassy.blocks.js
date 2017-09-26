(function($, Drupal) {

  grapesjs.plugins.add('drupal-blocks', function(editor, opts) {
    var domComponents = editor.DomComponents;
    var blockManager = editor.BlockManager;

    var field = domComponents.addComponent({
      tagName: 'block',
      removable: true,
      draggable: 'row, cell, li, a, td, strong, em, h1, h2, h3, h4, h5, h6',
      droppable: false,
      copyable: true, // Disable copy/past
      content: '{{  }}', // Text inside component
      attributes: { 'data-block': '' }
    });

    for(var i in drupalSettings.wembassy.siteBuilder.drupalBlocks) {
      var block = drupalSettings.wembassy.siteBuilder.drupalBlocks[i];
      if (block.value !== '' && block.value !== null) {
        blockManager.add(block.id, {
          label: block.label,
          content: '<block data-block="' + block.id + '"><span>' + block.value + '</span></block>',
          category: 'Blocks'
        });
      }
    }

  });

})(jQuery, Drupal);
