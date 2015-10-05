ionic.Platform.ready(function lockOrientation () {
  if (!ionic.Platform.isWebView()) { return; }
  screen.lockOrientation('portrait');
});
