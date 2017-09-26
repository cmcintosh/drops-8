(function($, Drupal) {

  $(document).ready(function(){

    function updateTooltip(coll, pos) {
      coll.each(function(item) {
        var attrs = item.get('attributes');
        attrs['data-tooltip-pos'] = pos || 'bottom';
        item.set('attributes', attrs);
      });
    }

    var toolbar = $('#toolbar-administration');
    var head = $('head').html();
    $('#toolbar-administration').remove();
    var page_content = $('body').html();

    var editor = grapesjs.init({
        height: '100%',
        width: '100%',
        container: 'body',
        components: head + page_content + '<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/3.3.7/css/bootstrap.css" media="all">',
        // fromElement: 1,
        // showOffsets: 1,
        plugins: drupalSettings.wembassy.siteBuilder.plugins,
        pluginsOpts: drupalSettings.wembassy.siteBuilder.pluginsOpts,

        // Insert some default images
        assetManager: {
            assets: drupalSettings.wembassy.siteBuilder.assets
        },

        storageManager: {
            storeComponents: 1,
            storeStyles: 1,
        },
        // Configure style
        styleManager: {
            sectors: [
              {
                name: 'General',
                buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
                properties: [{
                    name: 'Alignment',
                    property: 'float',
                    type: 'radio',
                    defaults: 'none',
                    list: [
                      {
                          value: 'none',
                          className: 'fa fa-times'
                      },
                      {
                          value: 'left',
                          className: 'fa fa-align-left'
                      },
                      {
                          value: 'right',
                          className: 'fa fa-align-right'
                      }
                    ],
                  },
                    {
                        property: 'position',
                        type: 'select'
                    }
                ],
            },
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
              properties: [
                {
                  property: 'margin',
                  properties: [
                    {
                        name: 'Top',
                        property: 'margin-top'
                    },
                    {
                        name: 'Right',
                        property: 'margin-right'
                    },
                    {
                        name: 'Bottom',
                        property: 'margin-bottom'
                    },
                    {
                        name: 'Left',
                        property: 'margin-left'
                    }
                  ],
                  },
                  {
                    property: 'padding',
                    properties: [{
                            name: 'Top',
                            property: 'padding-top'
                        },
                        {
                            name: 'Right',
                            property: 'padding-right'
                        },
                        {
                            name: 'Bottom',
                            property: 'padding-bottom'
                        },
                        {
                            name: 'Left',
                            property: 'padding-left'
                        }
                    ],
                }],
            },
            {
                name: 'Typography',
                open: false,
                buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
                properties: [{
                        name: 'Font',
                        property: 'font-family',
                        // list: drupalSettings.wembassy.siteBuilder.fonts
                    },
                    {
                        name: 'Weight',
                        property: 'font-weight'
                    },
                    {
                        name: 'Font color',
                        property: 'color',
                    },
                    {
                        property: 'text-align',
                        type: 'radio',
                        defaults: 'left',
                        list: [{
                                value: 'left',
                                name: 'Left',
                                className: 'fa fa-align-left'
                            },
                            {
                                value: 'center',
                                name: 'Center',
                                className: 'fa fa-align-center'
                            },
                            {
                                value: 'right',
                                name: 'Right',
                                className: 'fa fa-align-right'
                            },
                            {
                                value: 'justify',
                                name: 'Justify',
                                className: 'fa fa-align-justify'
                            }
                        ],
                    }, {
                        property: 'text-decoration',
                        type: 'radio',
                        defaults: 'none',
                        list: [{
                                value: 'none',
                                name: 'None',
                                className: 'fa fa-times'
                            },
                            {
                                value: 'underline',
                                name: 'underline',
                                className: 'fa fa-underline'
                            },
                            {
                                value: 'line-through',
                                name: 'Line-through',
                                className: 'fa fa-strikethrough'
                            }
                        ],
                    }, {
                        property: 'text-shadow',
                        properties: [{
                                name: 'X position',
                                property: 'text-shadow-h'
                            },
                            {
                                name: 'Y position',
                                property: 'text-shadow-v'
                            },
                            {
                                name: 'Blur',
                                property: 'text-shadow-blur'
                            },
                            {
                                name: 'Color',
                                property: 'text-shadow-color'
                            }
                        ],
                    }
                ],
            }, {
                name: 'Decorations',
                open: false,
                buildProps: ['opacity', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                properties: [{
                    type: 'slider',
                    property: 'opacity',
                    defaults: 1,
                    step: 0.01,
                    max: 1,
                    min: 0,
                }, {
                    property: 'border-radius',
                    properties: [{
                            name: 'Top',
                            property: 'border-top-left-radius'
                        },
                        {
                            name: 'Right',
                            property: 'border-top-right-radius'
                        },
                        {
                            name: 'Bottom',
                            property: 'border-bottom-left-radius'
                        },
                        {
                            name: 'Left',
                            property: 'border-bottom-right-radius'
                        }
                    ],
                }, {
                    property: 'box-shadow',
                    properties: [{
                            name: 'X position',
                            property: 'box-shadow-h'
                        },
                        {
                            name: 'Y position',
                            property: 'box-shadow-v'
                        },
                        {
                            name: 'Blur',
                            property: 'box-shadow-blur'
                        },
                        {
                            name: 'Spread',
                            property: 'box-shadow-spread'
                        },
                        {
                            name: 'Color',
                            property: 'box-shadow-color'
                        },
                        {
                            name: 'Shadow type',
                            property: 'box-shadow-type'
                        }
                    ],
                }, {
                    property: 'background',
                    properties: [{
                            name: 'Image',
                            property: 'background-image'
                        },
                        {
                            name: 'Repeat',
                            property: 'background-repeat'
                        },
                        {
                            name: 'Position',
                            property: 'background-position'
                        },
                        {
                            name: 'Attachment',
                            property: 'background-attachment'
                        },
                        {
                            name: 'Size',
                            property: 'background-size'
                        }
                    ],
                }, ],
            }, {
                name: 'Extra',
                open: false,
                buildProps: ['transition', 'perspective', 'transform'],
                properties: [{
                    property: 'transition',
                    properties: [{
                            name: 'Property',
                            property: 'transition-property'
                        },
                        {
                            name: 'Duration',
                            property: 'transition-duration'
                        },
                        {
                            name: 'Easing',
                            property: 'transition-timing-function'
                        }
                    ],
                }, {
                    property: 'transform',
                    properties: [{
                            name: 'Rotate X',
                            property: 'transform-rotate-x'
                        },
                        {
                            name: 'Rotate Y',
                            property: 'transform-rotate-y'
                        },
                        {
                            name: 'Rotate Z',
                            property: 'transform-rotate-z'
                        },
                        {
                            name: 'Scale X',
                            property: 'transform-scale-x'
                        },
                        {
                            name: 'Scale Y',
                            property: 'transform-scale-y'
                        },
                        {
                            name: 'Scale Z',
                            property: 'transform-scale-z'
                        }
                    ],
                }]
            }, {
                name: 'Flex',
                open: false,
                properties: [{
                    name: 'Flex Container',
                    property: 'display',
                    type: 'select',
                    defaults: 'block',
                    list: [{
                            value: 'block',
                            name: 'Disable'
                        },
                        {
                            value: 'flex',
                            name: 'Enable'
                        }
                    ],
                }, {
                    name: 'Flex Parent',
                    property: 'label-parent-flex',
                    type: 'integer',
                }, {
                    name: 'Direction',
                    property: 'flex-direction',
                    type: 'radio',
                    defaults: 'row',
                    list: [{
                        value: 'row',
                        name: 'Row',
                        className: 'icons-flex icon-dir-row',
                        title: 'Row',
                    }, {
                        value: 'row-reverse',
                        name: 'Row reverse',
                        className: 'icons-flex icon-dir-row-rev',
                        title: 'Row reverse',
                    }, {
                        value: 'column',
                        name: 'Column',
                        title: 'Column',
                        className: 'icons-flex icon-dir-col',
                    }, {
                        value: 'column-reverse',
                        name: 'Column reverse',
                        title: 'Column reverse',
                        className: 'icons-flex icon-dir-col-rev',
                    }],
                }, {
                    name: 'Justify',
                    property: 'justify-content',
                    type: 'radio',
                    defaults: 'flex-start',
                    list: [{
                        value: 'flex-start',
                        className: 'icons-flex icon-just-start',
                        title: 'Start',
                    }, {
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-just-end',
                    }, {
                        value: 'space-between',
                        title: 'Space between',
                        className: 'icons-flex icon-just-sp-bet',
                    }, {
                        value: 'space-around',
                        title: 'Space around',
                        className: 'icons-flex icon-just-sp-ar',
                    }, {
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-just-sp-cent',
                    }],
                }, {
                    name: 'Align',
                    property: 'align-items',
                    type: 'radio',
                    defaults: 'center',
                    list: [{
                        value: 'flex-start',
                        title: 'Start',
                        className: 'icons-flex icon-al-start',
                    }, {
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-al-end',
                    }, {
                        value: 'stretch',
                        title: 'Stretch',
                        className: 'icons-flex icon-al-str',
                    }, {
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-al-center',
                    }],
                }, {
                    name: 'Flex Children',
                    property: 'label-parent-flex',
                    type: 'integer',
                }, {
                    name: 'Order',
                    property: 'order',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                }, {
                    name: 'Flex',
                    property: 'flex',
                    type: 'composite',
                    properties: [{
                        name: 'Grow',
                        property: 'flex-grow',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    }, {
                        name: 'Shrink',
                        property: 'flex-shrink',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    }, {
                        name: 'Basis',
                        property: 'flex-basis',
                        type: 'integer',
                        units: ['px', '%', ''],
                        unit: '',
                        defaults: 'auto',
                    }],
                }, {
                    name: 'Align',
                    property: 'align-self',
                    type: 'radio',
                    defaults: 'auto',
                    list: [{
                        value: 'auto',
                        name: 'Auto',
                    }, {
                        value: 'flex-start',
                        title: 'Start',
                        className: 'icons-flex icon-al-start',
                    }, {
                        value: 'flex-end',
                        title: 'End',
                        className: 'icons-flex icon-al-end',
                    }, {
                        value: 'stretch',
                        title: 'Stretch',
                        className: 'icons-flex icon-al-str',
                    }, {
                        value: 'center',
                        title: 'Center',
                        className: 'icons-flex icon-al-center',
                    }],
                }]
            }],
        },

    });

    var cmdm = editor.Commands;
    cmdm.add('open-github', {
        run: function(em, sender) {
            sender.set('active', false);
            window.open('https://github.com/cmcintosh/drops-8', '_blank');
        },
    });

    $('body').prepend(toolbar);
    window.editor = editor;
    drupalSettings.wembassy.siteBuilder.editor = editor;

    // Beautify tooltips
    $('*[title]').each(function() {
        var el = $(this);
        var title = el.attr('title').trim();
        if (!title)
            return;
        el.attr('data-tooltip', el.attr('title'));
        el.attr('title', '');
    });

    editor.on('load', function(e) {
      
    });

    //  Add Commands for selecting a template
    var cmdm = editor.Commands;
    cmdm.add('set-template', {
      run: function(editor, sender) {
        console.log('editor:', editor);
        console.log('sender:', sender);
      }
    });

    var pnm = editor.Panels;
    var panelTemplates = pnm.addPanel({
      id: 'templates-a',
      visible: true,
      buttons: [{
        id: 'page',
        command: 'set-template',
        attributes: {'title': 'page.html.twig'},
        html: 'page.html.twig',
        active: true,
      },{
        id: 'page--node',
        command: 'set-template',
        attributes: {'title': 'page--node.html.twig'},
        html: 'page--node.html.twig',
        active: true,
      }]
    });

  });
})(jQuery, Drupal);
