(function() {

  var btnTooltip = 'Songza Enhancement Suite Options';
  var btnTmpl = '<li id="ses-options"><a class="btn sz-tooltip" data-original-title="' + btnTooltip + '"><i class="icon ses-icon"></i></a></li>';
  var $btn = $(btnTmpl);

  var menuId = 'ses-options-menu';
  var menuTmpl = '<div id="' + menuId + '"><div class="ses-options"><i class="ses-icon"></i></div><div class="ses-description"></div></div>';
  var $menu = $(menuTmpl);

  var options = {
    'itunes-button': {
      'text': 'Buy Button'
    },
    'key-bindings': {
      'text': 'Hotkeys'
    }
  }

  var optionTmpl = _.template('<a href="#" id="<%= optionId %>"><%= optionStatus %><%= optionText %></a>');
  var statusTmpl = {
    'enabled': '<span class="status enabled">&#x2713;</span>',
    'disabled': '<span class="status disabled">&#x2717;</span>',
  }

  var toggleMenu = (function() {
    $('#body-delegate').append($menu.hide());
    return function(ev) {
      $menu.toggle().position({
        my: 'center top',
        at: 'center bottom',
        of: ev.currentTarget,
        collision: 'none',
        offset: '-1px 21px'
      });
      return false;
    };
  }());

  var generateOption = function(optionId, optionInfo) {
    return $(optionTmpl({
      'optionId': optionId,
      'optionStatus': $.cookie(optionId) === null ? statusTmpl.enabled : statusTmpl.disabled,
      'optionText': optionInfo.text
    })).on('click', toggleOption);
  };

  var toggleOption = function(ev) {

    var $option = $(ev.currentTarget);
    var optionId = $option.attr('id');
    var enabled = $.cookie(optionId) === null;

    if (enabled) {
      $.cookie(optionId, 'disabled', {
        expires: 365,
        path: '/'
      });
    } else {
      $.cookie(optionId, '', {
        expires: -1,
        path: '/'
      });
    }

    $option.replaceWith(generateOption(optionId, {
      'text': options[optionId].text
    }));

    $(document.body).trigger(optionId, [!enabled]);
  };

  var populateMenu = function() {
    var $options = $menu.find('.ses-options');
    $.each(options, function(optionId, optionInfo) {
      $options.append(generateOption(optionId, optionInfo));
    });
  };

  $('#header .szi-auth').prepend($btn);
  populateMenu();
  $btn.on('click', toggleMenu);
  $(document.body).on('click', function(ev) {
    var ids = _.union(_.keys(options), [menuId]);
    if (!_.contains(ids, ev.target.id)) {
      $menu.hide();
    }
  });

}());
