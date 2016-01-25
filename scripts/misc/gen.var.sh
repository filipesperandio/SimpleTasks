#!/usr/bin/env bash
source $SOURCE_ENV_FILE

mkdir -p tmp

VALUE=$(eval echo \$$1)
echo ${2:-"${VALUE}"}
