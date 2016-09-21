dist_zip = artifacts/bundle-$(APP_TAG)-$(TARGET_ENV).zip
$(dist_zip): build
	@mkdir -p $(dir $@)
	@zip -q -r $@ $(output) resources/

.PHONY: ios
ios: node_modules/phonegap-build-api node_modules/qrcode-terminal $(dist_zip)
	@PROJECT_PACKAGE=$(dist_zip) scripts/deploy/mobile
	@echo 'Downloading iOS ipa from phonegap...'
	@curl --progress-bar -L 'https://build.phonegap.com/api/v1/apps/$(PHONEGAP_APP_ID)/ios?auth_token=$(PHONEGAP_API_TOKEN)' \
		> artifacts/ios-$(APP_TAG)-$(TARGET_ENV).ipa

.PHONY: android
android: node_modules platforms/android config.xml build
	scripts/android.sh
