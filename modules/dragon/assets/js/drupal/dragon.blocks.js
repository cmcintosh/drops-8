(function($, Drupal) {

  // We want to add the Drupal Blocks as drag-n-drop components via grapesjs
  Drupal.behaviors.dragonBlocks = {
    attach: function (context, settings) {
      grapesjs.plugins.add('drupal-blocks', function(editor, opts) {
        var domComponents = editor.DomComponents;
        var blockManager = editor.BlockManager;
        var pnm = editor.Panels;
        var cmdm = editor.Commands;                 // Command Object.
        var defaultType = domComponents.getType('default');
        var defaultModel = defaultType.model;
        var defaultView = defaultType.view;
        var modal = editor.Modal;

        var blockEditModalContent = `
        <div class="container form">
          <div class="form-group">
            <label>Template Name</label> <input type="textfield" class="form-control">
          </div>
        </div>
        `;

        cmdm.add('drupal-block-edit', {
          run: function(editor, sender) {
            console.log('Called edit');
            drupalSettings.miniDragon.show();
          }
        });


        // Create the model for the block
        var blockModel = defaultModel.extend({
              defaults: Object.assign({}, defaultModel.prototype.defaults, {
                draggable: 'div, nav, region',
                droppable: false,
                traits: [
                  {
                      'label' : 'data-template',
                      'placeolder': 'E.g. block.html.twig',
                  }
                ],
                toolbar: [
                  {
                    attributes: {class: 'fa fa-arrows'},
                    command: 'tlb-move',
                  },{
                    attributes: {class: 'fa fa-clone'},
                    command: 'tlb-clone',
                  },{
                    attributes: {class: 'fa fa-trash'},
                    command: 'tlb-delete',
                  },
                  {
                    attributes: {class: 'fa fa-pencil'},
                    command: 'drupal-block-edit'
                  }
                ]
              })
            },
            // Static functions.
            {
              isComponent: function(el) {
                var attr = $(el).attr('data-block');
                if (typeof attr !== typeof undefined && attr !== false && ($(el).is('div') || $(el).is('nav')) ){
                  $(el).attr('data-gjs-editable', false);
                   return {
                     'type' : 'block'
                   }
                }
              },
            }
        );

        // Create the view for the block element.
        var blockView = defaultView.extend({
            attributes: {
              'data-gjs-editable' : false
            },
            events: {
              drop: function(event, ui) { }
            },
        });

        // Create the actual component.
        var blockComponent = domComponents.addType('block', {
            removable: true,
            content: '',
            attributes: {
                'data-block': '',
                'data-template': 'block.html.twig',
                'data-gjs-editable' : false
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

        settings.dragon.builder.preLoad.drupalBlocks = function(data) {

          return data;
        }

        // end of plugin
      });
      // end of behavior
    }
  }

})(jQuery, Drupal);
