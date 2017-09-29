(function($, Drupal) {
  var abform = $('#ab-variant-form').html();
  $('#ab-variant-form').remove();

  grapesjs.plugins.add('drupal-storage', function(editor, opts) {
    // Modal for use with saving.
    var modal = editor.Modal;

    //  Add Commands for selecting a template
    var cmdm = editor.Commands;
    cmdm.add('save-twig', {
      run: function(editor, sender) {
        editor.store();
      }
    });

    // Create a command for creating and pushing a commit for this template
    cmdm.add('commit-twig', {
      run: function(editor, sender) {
        if(prompt('Rebuild and Commit theme?')) {

        }
      }
    });

    // Create a command for toggling the A/B Testing pannel
    cmdm.add('ab-testing-toggle', {
      run: function(editor, sender) {
        $('#gjs-pn-ab-testing').toggle();
      }
    });

    var pnm = editor.Panels;
    var panelTemplates = pnm.addPanel({
      id: 'templates-a',
      visible: true,
      buttons: [{
        id: 'export-html-template',
        className: 'fa fa-download btn btn-small btn-success',
        command: 'export-template',
        attributes: { title: 'View code' },
      },
      {
        id: 'save-twig',
        className: 'btn btn-success btn-small fa fa-floppy-o',
        command: 'save-twig',
        html: 'Save Template',
        attributes: { title: 'Save Template' },
      },
      {
        id: 'commit-twig',
        className: 'btn btn-success btn-small fa fa-usb',
        command: 'commit-twig',
        html: 'Commit Template',
        attributes: { title: 'Commit Template' },
      },
      {
        id: 'ab-testing',
        className: 'btn btn-success btn-small ab-testing',
        command: 'ab-testing-toggle',
        attributes: { title: 'A/B Testing' },
      },
    ]
    });

    var panelAB = pnm.addPanel({
      id: 'ab-testing',
      visible: true,
      buttons: [{
        id: 'create-variant',
        className: '',
        html: '<strong>A/B</strong>',
        command: 'create-variant',
        attributes: { title: 'Save Variant' },
      }]
    });

    var drupalLoadTemplate = function() {
      var template = ($('#gjs-pn-templates-a select').val() !== '') ? $('#gjs-pn-templates-a select').val() : drupalSettings.wembassy.siteBuilder.current_template;
      var templateData = {
        'entity_type': drupalSettings.wembassy.siteBuilder.entity_type,
        'bundle': drupalSettings.wembassy.siteBuilder.bundle,
        'template': template,
        'variant' : 'original'
      };

      $.ajax({
        type: "POST",
        url: "/js/grapesjs/load",
        data: templateData,
        async: false,
        success: function(e) {
          drupalSettings.wembassy.siteBuilder.template_data = e.data;
        },
        dataType: "json"
      });
    }

    var storageManager = editor.StorageManager;
    var drupalStorage = storageManager.add('remote', {
      load: function(keys, clb) {
        var result = {},
        fd = {},
        params = {
          'entity_type': drupalSettings.wembassy.siteBuilder.entity_type,
          'bundle': drupalSettings.wembassy.siteBuilder.bundle,
          'template': $('#gjs-pn-templates-a select').val(),
          'default': 1,
          'status': 1
        };

        for(var key in params)
          fd[key] = params[key];

        fd.keys = keys;

        let req = $.ajax({
          url: '/js/grapesjs/load',
          data: fd,
          async: false,
          method: 'GET',
        }).done(function(d) {
          var result = {};
          for (var i = 0, len = keys.length; i < len; i++){
            var v = d.data[keys[i]];
            if(v) result[keys[i]] = v;
          }
          console.log(result);
          clb(result);
          return result;
        });

      },
      store: function(data, clb){
        var templateData = {
          'entity_type': drupalSettings.wembassy.siteBuilder.entity_type,
          'bundle': drupalSettings.wembassy.siteBuilder.bundle,
          'template': $('#gjs-pn-templates-a select').val(),
          'data': data,
          'default': 1,
          'status': 1,
        };
        $.ajax({
          type: "POST",
          url: "/js/grapesjs/save",
          data: templateData,
          async: false,
          success: function(e) {
            return true;
          },
          dataType: "json"
        }).done(function(e){
          console.log("Saved data", e);
          if (e.success == '1') {
            clb();
          }
          else {
            return false;
          }
        });
      }
    });


    // Create the template controls.
    editor.on('load', function(e){
      console.log('Load Called');
      
      $('#gjs-pn-ab-testing').hide();
      $('.ab-testing').html('A/B');
      $('.ab-testing').on('click', function(){
        $('#gjs-pn-ab-testing').toggle();
      });

      $('#gjs-pn-ab-testing').append(abform);

      var wrapper = $('<div></div>').append($('<label></label>').html('Template:'));
      var select = $('<select></select>');
      select.addClass('chosen');
      for (i in drupalSettings.wembassy.siteBuilder.suggestions) {
        var template_name = drupalSettings.wembassy.siteBuilder.suggestions[i] + ".html.twig";
        var option = $('<option></option>')
          .attr('value', template_name)
          .html(template_name);
        if ( drupalSettings.wembassy.siteBuilder.existing_templates.indexOf(template_name) !== -1 ) {
          option.addClass('existing_template');
          option.css({'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold'});
        }
          select.append(option);
      }
      wrapper.append(select);
      $('#gjs-pn-templates-a').append(wrapper);
      $('#gjs-pn-templates-a select').val(drupalSettings.wembassy.siteBuilder.current_template);
      $('.chosen').chosen();

      if (drupalSettings.wembassy.siteBuilder.existing_templates.indexOf(drupalSettings.wembassy.siteBuilder.current_template) !== -1 ) {
        $('#gjs-pn-templates-a .chosen-single').css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold' });
      }
      $('#gjs-pn-templates-a .chosen-results').each(function(e){
        if( drupalSettings.wembassy.siteBuilder.existing_templates.indexOf($(this).html()) > -1) {
          $(this).css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold' });
        }
      });

      // Handle when we change the template.  Ask if the user wants to update the display
      // if loading an existing template.
      $('#gjs-pn-templates-a select').on('change', function(evt, params){
        drupalSettings.wembassy.siteBuilder.current_template = $(this).val();
        if ( drupalSettings.wembassy.siteBuilder.existing_templates.indexOf( $(this).val() ) > -1) {
          $('#gjs-pn-templates-a .chosen-single').css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#fff', 'font-weight' : 'bold' });
          if (confirm('Refresh editor contents from template?')) {
            editor.load();
          }
        }
        else {
          $('#gjs-pn-templates-a .chosen-single').css({ 'background' : 'rgb(51, 122, 183)', 'color' : '#ccc', 'font-weight' : 'normal' });
        }
      });
      drupalSettings.wembassy.siteBuilder.storage_init = true;
    });

  });
})(jQuery, Drupal);
