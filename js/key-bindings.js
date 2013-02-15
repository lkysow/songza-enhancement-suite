(function() {

  var app;

  var toggle = function() {
    var player = app.getPlayer();
    if (!player) return;
    player.model.get('state') === 'play' ? player.pause() : player.play();
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

      key('space', function() {
        return !!toggle();
      });

      key('right', function() {
        return !!throttledSkip();
      });

      key('/', function() {
        return !!focusSearchInput();
      });

    });
  });

}());
