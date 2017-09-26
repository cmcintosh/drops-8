(function($, Drupal) {
  grapesjs.plugins.add('drupal-storage', function(editor, opts) {

    var storageManager = editor.StorageManager;
    var drupalStorage = storageManager.add('drupal', {
      type: 'remote',
      load: function(keys){
        var res = {};
        for (var i = 0, len = keys.length; i < len; i++){
          var v = localStorage.getItem(keys[i]);
          if(v) res[keys[i]] = v;
        }
        return res;
      },
      store: function(data){

        var templateData = {
          'entity_type': drupalSettings.wembassy.siteBuilder.entity_type,
          'bundle': drupalSettings.wembassy.siteBuilder.bundle,
          'template': $('#gjs-pn-templates-a select').val(),
          'data': data,
          'default': 1,
          'status': 1
        };
        $.ajax({
          type: "POST",
          url: "/js/grapesjs/save",
          data: templateData,
          success: function(e) {
            return true;
          },
          dataType: "json"
        });

      }});
    storageManager.setCurrent('drupal');

    // Create the template controls.
    editor.on('load', function(e){
      var wrapper = $('<div></div>').append($('<label></label>').html('Template:'));
      var select = $('<select></select>');
      for (i in drupalSettings.wembassy.siteBuilder.suggestions) {
        var option = $('<option></option>')
          .attr('value', drupalSettings.wembassy.siteBuilder.suggestions[i] + ".html.twig")
          .html(drupalSettings.wembassy.siteBuilder.suggestions[i] + ".html.twig");
        if (drupalSettings.wembassy.siteBuilder.existing_templates.indexOf(option.val()) > -1) {
          option.addClass('existing_template');
        }
          select.append(option);
      }
      wrapper.append(select);
      $('#gjs-pn-templates-a').append(wrapper);
      $('#gjs-pn-templates-a select').val(drupalSettings.wembassy.siteBuilder.current_template);

      // Handle when we change the template.  Ask if the user wants to update the display
      // if loading an existing template.
      $('#gjs-pn-templates-a select').on('change', function(){

      });
    });

  });
})(jQuery, Drupal);
