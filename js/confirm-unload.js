(function(){
	var enhancementId = 'confirm-unload';
  var isEnabled = function() {
    return $.cookie(enhancementId) === 'enabled';
  };

	window.onbeforeunload = function() {
		if (isEnabled()) return 'Leaving will cause you to lose your place in this playlist.';
	};
}());