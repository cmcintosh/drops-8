(function ($, Drupal) {

  Drupal.behaviors.wembassy_backend_admin = {
    attach: function(context, settings) {

      for (var i in settings.wembassy.breakpoints) {
        var option = $('<option></option>').val(i).html(i);
        $('#breakpoint-select').append(option);
      }

      /**
      * Initialize the builder.
      */
      var fields = settings.wembassy.builder.fields;
      var replaceFields = settings.wembassy.builder.replaceFields;
      var actionButtons = settings.wembassy.builder.actionButtons;
      var templates = settings.wembassy.builder.componentTemplates;
      var inputSets = settings.wembassy.builder.inputSets;
      var typeUserDisabledAttrs = settings.wembassy.builder.typeUserDisabledAttrs;
      var typeUserAttrs = settings.wembassy.builder.typeUserAttrs;
      var disabledAttrs = settings.wembassy.builder.disabledAttrs;

      var fbOptions = {
        subtypes: settings.wembassy.builder.subtypes,
        onSave: function(e, formData) {

        },
        stickyControls: {
          enable: true
        },
        sortableControls: false,
        fields: [
          {
            type: 'autocomplete',
            label: 'Custom Autocomplete',
            required: true,
            values: [
              {label: 'SQL'},
              {label: 'C#'},
              {label: 'JavaScript'},
              {label: 'Java'},
              {label: 'Python'},
              {label: 'C++'},
              {label: 'PHP'},
              {label: 'Swift'},
              {label: 'Ruby'}
            ]
          },
          {
            label: 'Star Rating',
            attrs: {
              type: 'starRating'
            },
            icon: '🌟'
          }
        ],
        templates: {
          starRating: function(fieldData) {
            return {
              field: '<span id="'+fieldData.name+'">',
              onRender: function() {
                $(document.getElementById(fieldData.name)).rateYo({rating: 3.6});
              }
            };
          }
        },
        inputSets: [{
              label: 'User Details',
              name: 'user-details', // optional
              showHeader: true, // optional
              fields: [{
                type: 'text',
                label: 'First Name',
                className: 'form-control'
              }, {
                type: 'select',
                label: 'Profession',
                className: 'form-control',
                values: [{
                  label: 'Street Sweeper',
                  value: 'option-2',
                  selected: false
                }, {
                  label: 'Brain Surgeon',
                  value: 'option-3',
                  selected: false
                }]
              }, {
                type: 'textarea',
                label: 'Short Bio:',
                className: 'form-control'
              }]
            }, {
              label: 'User Agreement',
              fields: [{
                type: 'header',
                subtype: 'h3',
                label: 'Terms & Conditions',
                className: 'header'
              }, {
                type: 'paragraph',
                label: 'Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.',
              }, {
                type: 'paragraph',
                label: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.',
              }, {
                type: 'checkbox',
                label: 'Do you agree to the terms and conditions?',
              }]
            }],
        typeUserDisabledAttrs: {
          autocomplete: ['access']
        },
        typeUserAttrs: {
          text: {
            className: {
              label: 'Class',
              options: {
                'red form-control': 'Red',
                'green form-control': 'Green',
                'blue form-control': 'Blue'
              },
              style: 'border: 1px solid red'
            }
          }
        },
        disableInjectedStyle: false,
        actionButtons: [{
          id: 'smile',
          className: 'btn btn-success',
          label: '😁',
          type: 'button',
          events: {
            click: function() {
              alert('😁😁😁 !SMILE! 😁😁😁');
            }
          }
        }],
        disableFields: ['autocomplete'],
        replaceFields: [
          {
            type: 'textarea',
            subtype: 'tinymce',
            label: 'tinyMCE',
            required: true,
          }
        ],
        disabledFieldButtons: {
          text: ['copy']
        }
      };
      var formData = window.sessionStorage.getItem('formData');
      var editing = true;

      if (formData) {
        fbOptions.formData = JSON.parse(formData)
      }

      /**
       * Toggles the edit mode for the demo
       * @return {Boolean} editMode
       */
      function toggleEdit() {
        document.body.classList.toggle('form-rendered', editing);
        return editing = !editing;
      }

      var setFormData = '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';

      $(document).ready(function(){
        var formBuilder = $('.build-wrap').formBuilder(fbOptions);
        var fbPromise = formBuilder.promise;

        fbPromise.then(function(fb) {
          var apiBtns = {
            showData: fb.actions.showData,
            clearFields: fb.actions.clearFields,
            getData: function() {
              console.log(fb.actions.getData());
            },
            setData: function() {
              fb.actions.setData(setFormData);
            },
            addField: function() {
              var field = {
                  type: 'text',
                  class: 'form-control',
                  label: 'Text Field added at: ' + new Date().getTime()
                };
              fb.actions.addField(field);
            },
            removeField: function() {
              fb.actions.removeField();
            },
            testSubmit: function() {
              var formData = new FormData(document.forms[0]);
              console.log('Can submit: ', document.forms[0].checkValidity());
              // Display the key/value pairs
              console.log('FormData:', formData);
              for(var pair of formData.entries()) {
                 console.log(pair[0]+ ': '+ pair[1]);
              }
            },
            resetDemo: function() {
              window.sessionStorage.removeItem('formData');
              location.reload();
            }
          };

          Object.keys(apiBtns).forEach(function(action) {
            document.getElementById(action)
            .addEventListener('click', function(e) {
              apiBtns[action]();
            });
          });

        });

        toggleEdit();
      });

    }
  };

})(jQuery, Drupal);
