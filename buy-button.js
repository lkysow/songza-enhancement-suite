/* My code */
var currSongName = '';
var currSongSelector = '.szi-meta .szi-current-song';
var badUrls = [];

// loop checking for play page and new song
setInterval(function() {
  if ($(currSongSelector + ' .szi-song').length > 0 && $(currSongSelector + ' .szi-artist').length > 0 && $('.szi-actions').length > 0 && $(currSongSelector + ' .szi-song').text() != currSongName) {
    currSongName = $(currSongSelector + ' .szi-song').text();
    updateBuyButton();
  }
}, 100);

function updateBuyButton() {
  var songName = $('.szi-meta .szi-current-song .szi-song').text();
  var artistName = $('.szi-meta .szi-current-song .szi-artist').eq(1).text();

  var searchTerm = encodeURI(songName + ' ' + artistName);
  var searchUrl = 'http://itunes.apple.com/search?term=' + searchTerm;
  if (badUrls.indexOf(searchUrl) == -1) {
    $.ajax({
      url: searchUrl,
      dataType: "json",
      success: function(data) {
        if (data && data.results && data.results[0].trackViewUrl) {
          var trackUrl = data.results[0].trackViewUrl;
          if (trackUrl) {
            trackUrl = trackUrl.replace('https://', 'itmss://');

            var html = "<a class='szi-control lkysow-buy-button lkysow-buy-link' href='#' onclick=\'window.location.href=\"" + trackUrl + "\";'><span class='btn btn-primary'>Buy on iTunes</span></a>";

            if ($('.szi-actions .lkysow-buy-button').length == 0) {
              $('.szi-actions').append(html);
            } else {
              $('.szi-actions .lkysow-buy-link').attr('onclick', 'window.location.href="' + trackUrl + '"');
            }
          }
        } else {
          badUrls.push(searchUrl);
        }
      },
      error: function(jqXHR, textStatus) {
        badUrls.push(searchUrl);
      }
    });
  }
}

var timeSinceLastSwitched = 0;
var TIME_BETWEEN_SKIP = 500;

// decrement the time since last switched counter until it's 0, then clear the interval
function decrementTimeSinceSkip(intervalId) {
  if (timeSinceLastSwitched > 0) {
    timeSinceLastSwitched--;
  } else {
    clearInterval(intervalId);
  }
}

var KEYS = {
  spaceBar: 32,
  rightArrow: 39
};

$(window).on('keypress', function(e) {
  switch(e.which) {
    case KEYS.spaceBar:
      // pause on spacebar
      $('.szi-pause').trigger('click');
      e.preventDefault();
      break;
  }
}).on('keydown', function(e) {
  switch(e.which) {
    case KEYS.rightArrow:
      // delay for switching so holding down the key
      if (timeSinceLastSwitched == 0) {
        timeSinceLastSwitched = TIME_BETWEEN_SKIP;
        $('.szi-skip-button').trigger('click');

        var id = setInterval(function() {
          decrementTimeSinceSkip(id);
        }, 1);
      }
      break;
  }
});
