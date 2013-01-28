/* My code */
var currSongName = '';
var currSongSelector = '.szi-meta .szi-current-song';

// loop checking for play page and new song
setInterval(function() {
  if ($(currSongSelector + ' .szi-song').length > 0 && $(currSongSelector + ' .szi-artist').length > 0 && $('.szi-actions').length > 0 && $(currSongSelector + ' .szi-song').text() != currSongName) {
    updateBuyButton();
  }
}, 100);

function updateBuyButton() {
  var songName = $('.szi-meta .szi-current-song .szi-song').text();
  var artistName = $('.szi-meta .szi-current-song .szi-artist').eq(1).text();

  var searchTerm = encodeURI(songName + ' ' + artistName);

  $.getJSON('http://itunes.apple.com/search?term=' + searchTerm, function(data) {
    if (data) {
      var trackUrl = data.results[0].trackViewUrl;
      if (trackUrl) {
        trackUrl = trackUrl.replace('https://', 'itmss://');

        var html = "<div class='lkysow-buy-button'><span class='btn btn-primary'><a class='lkysow-buy-link' href='#' onclick=\'window.location.href=\"" + trackUrl + "\";'>Buy on iTunes</a></span></div>";
        
        if ($('.szi-actions .lkysow-buy-button').length == 0) {
          $('.szi-actions').append(html);
        } else {
          $('.szi-actions .lkysow-buy-link').attr('onclick', 'window.location.href="' + trackUrl + '"');
        }  
      }
    }
  });
}

$(document).keypress(function(e) {
  switch(e.which) {
    case 32:
      $('.szi-pause').click();
      e.preventDefault();
      break;
  }
});

var timeSinceLastSwitched = 0;
var TIME_BETWEEN_SKIP = 500;

// decrement the time since last switched counter until it's 0, then clear the interval
function decrementTimeSinceSkip(intervalId) {
  if (timeSinceLastSwitched > 0) {
    timeSinceLastSwitched--;
  } else {
    console.log('interval cleared');
    clearInterval(intervalId);
  }
}

$(document).keydown(function(e) {
  switch(e.which) {
    case 39:
      console.log(timeSinceLastSwitched);
      if (timeSinceLastSwitched == 0) {
        timeSinceLastSwitched = TIME_BETWEEN_SKIP;
        $('.szi-skip-button').click();
        
        var id = setInterval(function() {
          decrementTimeSinceSkip(id);
        }, 1);
      }
      break;
  }
});