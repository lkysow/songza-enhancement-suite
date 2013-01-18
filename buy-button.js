/* My code */

var updateBuyButton = function () {
  var songName = $('.szi-meta .szi-current-song .szi-song').text();
  var artistName = $('.szi-meta .szi-current-song .szi-artist').eq(1).text();

  var searchTerm = encodeURI(songName + ' ' + artistName);

  $.getJSON('http://itunes.apple.com/search?term=' + searchTerm, function(data) {
    var trackUrl = data.results[0].trackViewUrl;
    trackUrl = trackUrl.replace('https://', 'itmss://');

    var html = "<div class='lkysow-buy-button'><span class='btn btn-primary'><a class='lkysow-buy-link' href='#' onclick=\'window.location.href=\"" + trackUrl + "\";'>Buy on iTunes</a></span></div>";
    
    if ($('.szi-actions .lkysow-buy-button').length == 0) {
      $('.szi-actions').append(html);
    } else {
      $('.szi-actions .lkysow-buy-link').attr('onclick', 'window.location.href="' + trackUrl + '"');
    }
  });
}

$('.szi-meta .szi-current-song .szi-song').livequery(function() {
  updateBuyButton();
  var songName = $('.szi-meta .szi-current-song .szi-song').text();

  setInterval(function() {
    if ($('.szi-meta .szi-current-song .szi-song').text() != songName) {
      songName = $('.szi-meta .szi-current-song .szi-song').text();
      updateBuyButton();
    }
  }, 100);
})
