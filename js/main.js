(function() {

  var app;

  var btnText = 'Buy on iTunes';
  var btnTmpl = '<div id="buy-button" class="btn btn-primary disabled">' + btnText + '</div>';
  var btnInstance = $(btnTmpl);

  var searchApi = 'http://itunes.apple.com/search';

  var getSongInfo = function() {
    var player = app.getPlayer();
    if (!player) return;
    var current = app.getPlayer().model.get("current");
    if (!current) return;
    return current.toJSON();
  };

  var refineSearchTerm = function(songInfo) {
    return [songInfo.title, songInfo.artist].join(' ');
  };

  var memoizedAjax = _.memoize(function(songInfo) {
    return $.ajax({
      dataType: 'jsonp',
      url: searchApi,
      data: {
        media: 'music',
        limit: 1,
        term: songInfo
      }
    });
  });

  var queryItunes = function(callback) {
    var songInfo = getSongInfo();
    if (!songInfo) return;

    memoizedAjax(refineSearchTerm(songInfo)).done(callback);
  };

  var openItunes = function(url) {
    url = url.replace(/^http/, 'itms');
    window.location.href = url;
  };

  var toggleBtn = function(disable) {
    btnInstance.off('click').toggleClass('disabled', disable);
  };

  var disableBtn = function() {
    toggleBtn(true);
  };

  var enableBtn = function() {
    toggleBtn(false);
  };

  var updateBtn = function() {
    queryItunes(function(data) {
      if (data.resultCount) {
        enableBtn();
        btnInstance.on('click', function() {
          return openItunes(data.results[0].trackViewUrl);
        });
      } else {
        disableBtn();
      }
    });
  };

  var createBtn = function() {
    if (!$.contains(document.body, btnInstance)) {
      $('#main-div .szi-actions').append(btnInstance);
    }
    updateBtn();
  };

  require(["songza/app"], function(App) {
    App.postInit(function() {

      app = App.getInstance();

      app.bind('all', function() {
        createBtn();
      });

      createBtn();

    });
  });

}());
