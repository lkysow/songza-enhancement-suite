var togglePause = function() {
  if ($('.szi-pause-button').css('display') != 'none') {
    $('.szi-pause-button').trigger('click');
  } else {
    $('.szi-play-button').trigger('click');
  }
};

key('space', function(ev) {
  // don't trigger pause event on space if user has focus on an input
  if (document.activeElement.tagName != "INPUT") {
    togglePause();
    return false;
  }
});

var skipSong = function() {
  $('.szi-skip-button').trigger('click');
};

// skipSong is throttled to execute at most once per 300 ms
// see http://lodash.com/docs#throttle
skipSong = _.throttle(skipSong, 300);

key('right', function(ev) {
  skipSong();
  return false;
});
