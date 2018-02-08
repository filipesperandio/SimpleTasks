ionic.Platform.ready(function addPlatformClasses () {
  [
    'platform-' + ionic.Platform.platform(),
    'platform-cordova',
    'platform-webview'
  ].forEach(function addClass (klass) {
    document.body.classList.add(klass);
  });
});
