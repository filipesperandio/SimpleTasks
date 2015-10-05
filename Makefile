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

BUILD_NUMBER ?= 0000
ENV_LABEL    ?= dev
APP_VERSION  ?= 0.1.0
APP_TAG      ?= $(APP_VERSION)-$(BUILD_NUMBER)

.PHONY: all
all: test lint build

.PHONY: clean
clean:; rm -rf $(output) artifacts/* tmp/*

.PHONY: clobber
clobber:; @cat .gitignore | xargs rm -rf

.PHONY: serve
serve: node_modules/nodemon
	@nodemon --quiet --ext html,js,json,scss,css --watch $(source)/ --ignore $(source)/lib --exec '$(MAKE) build' &
	@ionic serve --all --nobrowser --labs

include tasks/install.mk
include tasks/build.mk
include tasks/test.mk
include tasks/emulate.mk
include tasks/deploy.mk
include tasks/misc.mk
include tasks/jenkins.mk
include tasks/release.mk
