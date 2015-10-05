#!/bin/bash

find_plugins=$(cat <<-'EOF'
  /
    <(?:gap:)?plugin                                # plugin or gap:plugin
    (?!\s.*\bsource=(?:'|")pgb(?:'|"))              # ignore entries with source="pgb"
    (?=\s.*\bname=(?:'|")(.*?)(?:'|"))              # group $1: extract "name"
    (?=\s.*\b(?:version|spec)=(?:'|")(.*?)(?:'|"))? # group $2: extract "version" or "spec"
  /x
  && print "$1" . ($2 ? "\@$2" : "")
EOF)

plugins=$(cat www/config.xml | perl -lne "$find_plugins")
for plugin in ${plugins[@]}; do node_modules/.bin/cordova plugin add $plugin; done
