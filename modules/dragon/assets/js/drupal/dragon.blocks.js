(function($, Drupal) {

  Drupal.behaviors.dragonBlocks = {
    attach: function (context, settings) {
      grapesjs.plugins.add('drupal-blocks', function(editor, opts) {
        var domComponents = editor.DomComponents;
        var blockManager = editor.BlockManager;
        var pnm = editor.Panels;
        var defaultType = domComponents.getType('default');
        var defaultModel = defaultType.model;
        var defaultView = defaultType.view;

        // Create the model for the block
        var blockModel = defaultModel.extend({
              draggable: 'div',
              droppable: false,
            },
            // Static functions.
            {
              isComponent: function(el) {
                var attr = $(el).attr('data-block');
                if (typeof attr !== typeof undefined && attr !== false){
                   return {
                     'type' : 'block'
                   }
                }
                var id = $(el).attr('id');
                if (id != undefined) {
                  if (id.indexOf('block-') > -1) {
                    return {
                      'type' : 'block'
                    }
                  }
                }
              },
            }
        );

        // Create the view for the block element.
        var blockView = defaultView.extend({
            events: {
              drop: function(event, ui) { }
            }
        });

        // Create the actual component.
        var blockComponent = domComponents.addType('block', {
            removable: true,
            content: '',
            attributes: {
                'data-block': ''
            },
            model: blockModel,
            view: blockView,
        });

        // Create GrapeJS Blocks
        for (var i in settings.dragon.drupalBlocks) {
            if (i !== 'broken') {
              var block = settings.dragon.drupalBlocks[i];
              blockManager.add(i, {
                  label: block.id,
                  attributes: { 'class' : 'fa fa-cubes' },
                  content: '<div data-block="' +
                      i + '"><span data-block-content="1">' +
                      block.value + '</span></div>',
                  category: 'Blocks'
              });
            }
        }
        // end of plugin
      });
      // end of behavior
    }
  }

})(jQuery, Drupal);
