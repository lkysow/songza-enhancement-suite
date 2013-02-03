$(function() {

  var app;

  var btnText = 'Buy on iTunes';
  var btnTmpl = '<a id="buy-button" class="btn btn-primary" target="_blank">' + btnText + '</a>';
  var btnInstance = $(btnTmpl);

  var searchApi = 'http://itunes.apple.com/search';


  var iTunesLink = function() {
    return 'https://itunes.apple.com/us/album/gangnam-style-gangnamseutail/id560398387';
  };

  var updateBtn = function() {
    btnInstance.attr('href', iTunesLink());
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
