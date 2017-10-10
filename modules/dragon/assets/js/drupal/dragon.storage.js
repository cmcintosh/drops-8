(function($, Drupal) {

    Drupal.behaviors.dragonStorage = {
      attach: function(context, settings) {

        grapesjs.plugins.add('drupal-storage', function(editor, opts){
          var modal = editor.Modal;                   // Modal Object.
          var cmdm = editor.Commands;                 // Command Object.
          var pnm = editor.Panels;                    // Panels Object
          var storageManager = editor.StorageManager; // StorageManager Object.

          /**
          * Command for Saving to database.
          */
          cmdm.add('save-twig', {
            run: function(editor, sender) {
              editor.store();
            }
          });

          /**
          * Command used for exporting a theme.
          */
          cmdm.add('export-theme', {
            run: function(editor, sender) {
              editor.store();
              $('#dragon-loader').show();
              params = {
                'template': $('#gjs-pn-templates-a select').val(),
                'theme' : settings.dragon.page.current_theme,
                'new_theme' : settings.dragon.page.new_theme,
                'variant' : settings.dragon.current_variant,
              };

              $.ajax({
                type: "POST",
                url: "/js/grapesjs/build-theme",
                data: params,
                async: false,
                success: function(e) {
                  $('#dragon-loader').hide();
                },
                always: function(e) {
                  $('#dragon-loader').hide();
                },
                dataType: "json"
              });

            }
          })

          /**
          * Command for Displaying the modal for exporting a theme.
          */
          cmdm.add('export-theme-modal', {
            run: function(editor, sender) {
              modal.setTitle("Export Theme");
              modal.setContent(`
                <div class="form-inline">
                  <div class="form-group col-md-12">
                    <label class="col-md-4">Current Theme</label> <div id="current-theme" class="form-control"></div>
                  </div>
                  <div class="form-group col-md-12" id="base-theme-wrapper">
                    <label class="col-md-4">Base Theme</label> <div id="base-theme" class="form-control"> </div>
                  </div>
                  <div class="form-group col-md-12" id="rebuild-theme-wrapper">
                    <label class="col-md-4">Rebuild Theme</label> <input class="form-control" id="rebuild-theme" type="checkbox">
                  </div>
                  <div class="form-group col-md-12" id="new-theme-wrapper">
                    <label class="col-md-4">New Theme</label> <input class="form-control" id="new-theme" type="textfield">
                  </div>

                  <button id="export-theme" class="btn btn-success">Export Theme</button>
                </div>
              `);

              // Update with variables.
              $('#current-theme').html(settings.dragon.page.current_theme);
              $('#base-theme').html(settings.dragon.page.base_theme);



              $('#export-theme').on('click', function(){
                settings.dragon.page.rebuild = $('#rebuild-theme').val();
                settings.dragon.page.new_theme = $('#new-theme').val();
                var exportCmd = cmdm.get('export-theme');
                exportCmd.run();
              });

              modal.open();
              if (settings.dragon.page.base_theme == false || settings.dragon.page.base_theme == undefined || settings.dragon.page.base_theme == '' || settings.dragon.page.dragon_built == false) {
                $('#rebuild-theme-wrapper').hide();
              }

              if (settings.dragon.page.base_theme == false || settings.dragon.page.base_theme == undefined || settings.dragon.page.base_theme == '' || settings.dragon.page.dragon_built == false) {
                $('#base-theme-wrapper').hide();
              }
            }
          });

          /*
          * Create the Storage Controls.
          */
          var panelTemplates = pnm.addPanel({
            id: 'templates-a',
            visible: true,
            buttons: [
              {
                id: 'ab-testing',
                className: 'ab-testing-btn btn btn-info btn-small',
              },
              {
                id: 'export-html-template',
                className: 'fa fa-download btn btn-small btn-success',
                command: 'export-template',
                attributes: { title: 'View code' },
              },
              {
                id: 'save-twig',
                className: 'btn btn-warning btn-small fa fa-floppy-o',
                command: 'save-twig',
                html: 'Save Template',
                attributes: { title: 'Save Template' },
              },
              {
                id: 'export-theme',
                className: 'btn btn-danger btn-small fa fa-cubes',
                command: 'export-theme-modal',
                attributes: { title: 'Rebuild Theme'}
              },
            ]
          });

          /**
          * On editor initialization.
          */
          editor.on('load', function(e){

            if ($('#gjs-pn-templates-a select').length > 0) {
              return;
            }

            $('#gjs-pn-ab-testing').hide();
            $('.ab-testing-btn').html('A/B');
            $('.ab-testing-btn').on('click', function(){
              $('#gjs-pn-ab-testing').toggle();
            });

            var wrapper = $('<div></div>').append($('<label></label>').html('Template:'));
            var select = $('<select></select>');
            select.addClass('chosen');

            // Add available suggestions to the list.
            for (i in settings.dragon.page.suggestions) {
              var template_name = settings.dragon.page.suggestions[i] + ".html.twig";
              var option = $('<option></option>')
                .attr('value', template_name)
                .html(template_name);
              if ( settings.dragon.page.existing_templates.indexOf(template_name) !== -1 ) {
                option.addClass('existing_template');
                option.css({'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold'});
              }
                select.append(option);
            }

            wrapper.append(select);
            $('#gjs-pn-templates-a').append(wrapper);
            $('#gjs-pn-templates-a select').val(settings.dragon.page.current_template);
            $('.chosen').chosen();

            if (settings.dragon.page.existing_templates.indexOf(settings.dragon.page.current_template) !== -1 ) {
              $('#gjs-pn-templates-a .chosen-single').css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold' });
            }

            // Set background color on existing templates.
            $('#gjs-pn-templates-a .chosen-results').each(function(e){
              if( settings.dragon.page.existing_templates.indexOf($(this).html()) > -1) {
                $(this).css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold' });
              }
            });

            // Handle when we change the template.  Ask if the user wants to update the display
            // if loading an existing template.
            $('#gjs-pn-templates-a select').on('change', function(evt, params){
              settings.dragon.page.current_template = $(this).val();
              if ( settings.dragon.page.existing_templates.indexOf( $(this).val() ) > -1) {
                $('#gjs-pn-templates-a .chosen-single').css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold' });
                if (confirm('Refresh editor contents from template?')) {
                    editor.load();
                }
              }
              else {
                $('#gjs-pn-templates-a .chosen-single').css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#ccc', 'font-weight' : 'normal' });
              }
            });
            drupalSettings.dragon.builder.storage_init = true;
          });


          /**
          * Drupal storage engine.
          *
          * - template is the id,
          * - theme
          * - variant - original by default
          */
          

        });// end of plugin
      } // end of behavior
    };

})(jQuery, Drupal);
