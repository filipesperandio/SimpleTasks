PATH       := node_modules/.bin:$(PATH)
SHELL      := /usr/bin/env bash
# ------------------------------------------------------------------------------
bower      := $(shell cat .bowerrc | python -c 'import json,sys;print json.load(sys.stdin)["directory"];')

source     := src
source_js   = $(shell find -L $(source) ! -path "$(bower)/*" -type f -name '*.js')
source_css  = $(shell find -L $(source) ! -path "$(bower)/*" -type f -name '*.scss')
source_rest = $(shell find -L $(source) ! -path "$(bower)/*" ! -name '*.js' ! -name '*.scss' -type f)

output     := www
output_css  = $(output)/css/index.css
output_js   = $(output)/js/index.js
output_rest = $(patsubst $(source)/%,$(output)/%,$(source_rest))

export BUILD_NUMBER    ?= 0000
export ENV_LABEL       ?= dev
export APP_VERSION     ?= 0.1.1
export APP_TAG         ?= $(APP_VERSION)-$(BUILD_NUMBER)
export SOURCE_ENV_FILE	= environments/${ENV_LABEL}.env

.PHONY: all
all: test lint build

.PHONY: clean
clean:; rm -rf $(output) artifacts/* tmp/*

.PHONY: clean.mobile
clean.mobile:; rm -rf $(output) plugins/* platforms/*

.PHONY: clobber
clobber:; @cat .gitignore | xargs rm -rf

.PHONY: server
server: 
	@ionic serve --all --nobrowser --labs

.PHONY: serve
serve:
	@$(MAKE) -j2 build.watch server

.INTERMEDIATE: config.xml
config.xml: $(output)/config.xml
	cp $(output)/config.xml config.xml

include tasks/install.mk
include tasks/build.mk
include tasks/test.mk
include tasks/emulate.mk
include tasks/deploy.mk
include tasks/misc.mk
include tasks/jenkins.mk
include tasks/release.mk
include tasks/mobile.mk
