$(function() {

  var app;

  var btnText = 'Buy on iTunes';
  var btnTmpl = '<div id="buy-button" class="btn btn-primary">' + btnText + '</div>';
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

  var queryItunes = function(callback) {
    var songInfo = getSongInfo();
    if (!songInfo) return;

    $.ajax({
      dataType: 'jsonp',
      url: searchApi,
      data: {
        media: 'music',
        limit: 1,
        term: refineSearchTerm(songInfo)
      }
    }).done(function(data) {
      if (!data.resultCount) return;
      callback(data.results[0].trackViewUrl);
    });
  };

  var updateBtn = function() {
    queryItunes(function(trackViewUrl) {
      btnInstance.off('click').on('click', function() {
        return its.detect.openItunes(trackViewUrl);
      });
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

    });
  });

});
