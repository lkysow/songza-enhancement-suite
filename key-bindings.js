var togglePause = function() {
  $('.szi-pause').trigger('click');
};

key('space', function(ev) {
  togglePause();
  return false;
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
