#!/usr/bin/env bash
set -euo

source $SOURCE_ENV_FILE

publish() {
  mkdir -p artifacts
  for source_apk in platforms/android/build/outputs/apk/*release.apk
  do 
    local dest_apk=$(basename $source_apk | sed "s|\.apk|-${APP_TAG}-${ENV_LABEL}.apk|")
    cp $source_apk artifacts/${dest_apk} 
  done
}

build-android() {
  ionic build android --release
}

echo "Building Android - Name: ${APP_NAME} | ENV: ${ENV_LABEL}"
build-android
publish
