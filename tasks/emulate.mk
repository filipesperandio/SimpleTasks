.PHONY: run.emulate.ios
run.emulate.ios: node_modules/ios-sim node_modules platforms/ios build
	@cordova run ios

.PHONY: run.emulate.android
run.emulate.android: node_modules platforms/android build
	@cordova run android

platforms/%: $(output)/config.xml node_modules
	@rm -rf $@
	@mkdir -p $(output) $(dir $@)
	@cordova platform add $*
