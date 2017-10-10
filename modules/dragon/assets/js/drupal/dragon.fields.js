(function($, Drupal) {
  // grapesjs.plugins.add('drupal-fields', function(editor, opts) {
  //   let config = opts;
  //
  //   var domComponents = editor.DomComponents;
  //
  //   var meta = domComponents.addComponent({
  //     tagName: 'meta',
  //     removable: false, // Can't remove it
  //     draggable: false,
  //     copyable: false, // Disable copy/past
  //     hiddenLayer: true,
  //     content: '',
  //   });
  //
  //   var link = domComponents.addComponent({
  //     tagName: 'link',
  //     removable: false, // Can't remove it
  //     draggable: false,
  //     copyable: false, // Disable copy/past
  //     hiddenLayer: true,
  //     content: '',
  //     attributes: { 'rel': '', 'href':'' }
  //   });
  //
  //   var script = domComponents.addComponent({
  //     tagName: 'script',
  //     removable: false, // Can't remove it
  //     draggable: false,
  //     copyable: false, // Disable copy/past
  //     hiddenLayer: true,
  //     content: '',
  //     attributes: { 'type': '', 'src': ''}
  //   });
  //
  //   var field = domComponents.addComponent({
  //     tagName: 'field',
  //     removable: true,
  //     draggable: 'region, row, cell, li, a, td, strong, em, h1, h2, h3, h4, h5, h6',
  //     droppable: false,
  //     copyable: true, // Disable copy/past
  //     content: '{{  }}', // Text inside component
  //     attributes: { 'data-field': '' }
  //   });
  //
  //   // Loop through the defined fields and create blocks for them.
  //   var blockManager = editor.BlockManager;
  //
  //   for(var i in drupalSettings.dragon.siteBuilder.fields) {
  //     var field = drupalSettings.dragon.siteBuilder.fields[i];
  //
  //     if (field.value !== '' && field.value !== null) {
  //       blockManager.add(field.id, {
  //         label: field.label,
  //         content: '<field data-field="' + field.id + '"><span>' + field.value + '</span></field>',
  //         category: 'Fields'
  //       });
  //
  //     }
  //   }
  //
  //   // Used in preparing fields to be displayed on the editor.
  //   drupalSettings.dragon.builder.preLoad.fields = function(data) {
  //     if (data != undefined && data != null) {
  //       var html = $(data['gjs-html']);
  //       html.find('field').each(function(){
  //         var content = drupalSettings.dragon.siteBuilder.fields[$(this).attr('data-field')].value;
  //         $(this).replaceWith(function(){
  //             var field = $("<field />", {html: content, 'data-field' : $(this).attr('data-field') });
  //             return field;
  //         });
  //       });
  //       data['gjs-html'] = $('<div></div>').append(html).html();
  //     }
  //     return data;
  //   }
  //
  //   //  Used in preparing fields to be stored.
  //   drupalSettings.dragon.builder.preStore.fields = function(data) {
  //     var html = $(data['gjs-html']);
  //     html.find('field').each(function(){
  //       $(this).html("{{ " + drupalSettings.dragon.siteBuilder.fields[$(this).attr('data-field')].entity_type + "." + $(this).attr('data-field') + " | raw }}");
  //     });
  //     data['gjs-html'] = $('<div></div>').append(html).html();
  //     return data;
  //   }
  //
  // });
})(jQuery, Drupal);
