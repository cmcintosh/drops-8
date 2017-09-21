(function ($, Drupal) {

  Drupal.behaviors.wembassy_colorpicker = {
    attach: function(context, settings) {

      $('.spectrum').each(function() {
        var self = $(this);
        // $(this).spectrum({
        //   showInput: true,
        //   showAlpha: true,
        //   showPalette: true,
        //   clickoutFiresChange: true,
        //   color: $(this).val(),
        //   change: function(color) {
        //     $(this).val(color.toHexString());
        //   }
        // });


      });

    }
  };

})(jQuery, Drupal);
