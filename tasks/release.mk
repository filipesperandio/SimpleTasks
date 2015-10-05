artifacts := artifacts/android-$(APP_TAG)-$(TARGET_ENV).apk artifacts/ios-$(APP_TAG)-$(TARGET_ENV).ipa artifacts/bundle-$(APP_TAG)-$(TARGET_ENV).zip

.PHONY: tag.release
tag.release: $(artifacts)
	scripts/tag.release $(APP_VERSION) $(BUILD_NUMBER) artifacts/
