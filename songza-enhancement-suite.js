var resources = chrome.runtime.getManifest().web_accessible_resources;

resources.forEach(function(src) {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(src);
  document.body.appendChild(s);
});
