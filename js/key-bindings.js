(function() {

  var enhancementId = 'key-bindings';
  var enabled;
  var setStatus = function() {
    enabled = $.cookie(enhancementId) === null;
  };

  var app;

  var toggle = function() {
    var player = app.getPlayer();
    if (!player) return;
    player.model.get('playState') === 'play' ? player.pause() : player.play();
  };

  var skip = function() {
    var player = app.getPlayer();
    player && player.skip();
  };

  var throttledSkip = _.throttle(skip, 300);

  var focusSearchInput = function() {
    $('#search-query').focus();
  };

  require(["songza/app"], function(App) {
    App.postInit(function() {

      app = App.getInstance();
      setStatus();

      key('space', function() {
        if (enabled) return !!toggle();
      });

      key('right', function() {
        if (enabled) return !!throttledSkip();
      });

      key('/', function() {
        if (enabled) return !!focusSearchInput();
      });

      $(document.body).on(enhancementId, setStatus);

    });
  });

}());
