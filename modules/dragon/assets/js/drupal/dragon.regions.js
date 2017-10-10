(function($, Drupal) {
        Drupal.behaviors.dragonRegions = {
            attach: function(context, settings) {
                grapesjs.plugins.add('drupal-regions', function(editor, opts) {
                        var domComponents = editor.DomComponents;
                        var blockManager = editor.BlockManager;
                        var pnm = editor.Panels;
                        var defaultType = domComponents.getType('default');
                        var defaultModel = defaultType.model;
                        var defaultView = defaultType.view;

                        // Create the model for the region element.
                        var regionModel = defaultModel.extend({
                              draggable: 'div',
                              droppable: true,
                            },
                            // Static functions.
                            {
                              isComponent: function(el) {
                                var attr = $(el).attr('data-region');
                                if (typeof attr !== typeof undefined && attr !== false){
                                   return {
                                     'type' : 'region'
                                   }
                                }
                              },
                            }
                        );

                        // Create the view for the region element.
                        var regionView = defaultView.extend({
                            events: {
                                drop: function(event, ui) {
                                    console.log('Dropped', event);
                                    console.log('Dropped', ui);
                                }
                            }
                        });

                        // Create the actual component.
                        var regionComponent = domComponents.addType('region', {
                            removable: true,
                            content: '',
                            attributes: {
                                'data-region': ''
                            },
                            model: regionModel,
                            view: regionView,
                        });

                        // Create GrapeJS Blocks
                        for (var i in settings.dragon.regions) {
                            var region = settings.dragon.regions[i];
                            blockManager.add(i, {
                                label: region,
                                content: '<div data-region="' +
                                    i + '"><span>' +
                                    region + '</span></div>',
                                category: 'Regions'
                            });
                        }
                    });
                  }
                };


                // grapesjs.plugins.add('drupal-regions', function(editor, opts) {
                //   var domComponents = editor.DomComponents;
                //   var blockManager = editor.BlockManager;
                //   var pnm = editor.Panels;
                //
                //   var region = domComponents.addComponent({
                //     tagName: 'region',
                //     removable: true,
                //     draggable: 'block, field, ul, ol, a, td, strong, em, h1, h2, h3, h4, h5, h6',
                //     droppable: 'cell, row',
                //     copyable: false,
                //     content: '{{ }}',
                //     attributes: { 'data-region' : '' }
                //   });
                //
                //   for(var i in drupalSettings.dragon.siteBuilder.regions) {
                //     var region = drupalSettings.dragon.siteBuilder.regions[i];
                //       blockManager.add(i, {
                //         label: region,
                //         content: '<region data-region="'
                //           + i + '"><span>'
                //           + region + '</span></region>',
                //         category: 'Regions'
                //       });
                //     }
                //
                // });
                //
                // // Used in preparing the region to be displayed in the editor.
                // drupalSettings.dragon.builder.preLoad.regions = function(data) {
                //   if (data != undefined && data != null) {
                //     var html = $(data['gjs-html']);
                //     html.find('region').each(function(){
                //       var content = drupalSettings.dragon.siteBuilder.regions[$(this).attr('data-region')];
                //       $(this).html(content);
                //     });
                //     data['gjs-html'] = $('<div></div>').append(html).html();
                //   }
                //   return data;
                // }
                //
                // //  Used in preparing regions to be stored.
                // drupalSettings.dragon.builder.preStore.regions = function(data) {
                //   var html = $(data['gjs-html']);
                //   html.find('region').each(function(){
                //     $(this).html("{{ page." + $(this).attr('data-region') + " }}")
                //   });
                //   data['gjs-html'] = $('<div></div>').append(html).html();
                //   return data;
                // }

            })(jQuery, Drupal);
