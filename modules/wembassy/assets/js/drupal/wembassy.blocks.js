(function($, Drupal) {

  grapesjs.plugins.add('drupal-blocks', function(editor, opts) {
    var domComponents = editor.DomComponents;
    var blockManager = editor.BlockManager;
    var pnm = editor.Panels;
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

    pnm.addPanel({
      id: 'search-blocks',
      visible: true,
      buttons: [{
        id: 'search-blocks-wrapper',
        attributes: {type: 'textfield', placeholder: 'Search for a element'}
      }]
    });

    editor.on('load', function(e){
      // add controls for the Search Block components.
      $('#gjs-pn-search-blocks').html('<input type="textfield" id="search-blocks-input" placeholder="Search...">');

      $('#gjs-pn-views .gjs-pn-btn').on('click', function(){
        if ($(this).hasClass('fa-th-large')) {
          $('#gjs-pn-search-blocks').show();
        }
        else {
          $('#gjs-pn-search-blocks').hide();
        }
      });

      $('#search-blocks-input').on('keyup', function(){
        // Autocomplete.
        if ($(this).val() !== '' && $(this).val() !== null) {
          $('.gjs-blocks-cs .gjs-block-label').each(function(){

            if ($(this).html().toLowerCase().indexOf($('#search-blocks-input').val().toLowerCase()) < 0) {
              $(this).parent().hide();
            }
            else {
              $(this).parent().show();
            }
          });
        }
        else {
          $('.gjs-blocks-cs .gjs-block-label').parent().show();
        }
      });
    });

  });

})(jQuery, Drupal);
