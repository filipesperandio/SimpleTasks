PATH       := node_modules/.bin:$(PATH)
SHELL      := /usr/bin/env bash
# ------------------------------------------------------------------------------
source     := src
source_js   = $(shell find -L $(source) -type f -name '*.js')
source_css  = $(shell find -L $(source) -type f -name '*.scss')
source_rest = $(shell find -L $(source) ! -name '*.js' ! -name '*.scss' -type f)

output     := dist
output_css  = $(output)/css/index.css
output_js   = $(output)/js/index.js
output_rest = $(patsubst $(source)/%,$(output)/%,$(source_rest))

export BUILD_NUMBER    ?= 1000
export ENV_LABEL       ?= dev
export APP_VERSION     ?= 1.0.0
export APP_TAG         ?= $(APP_VERSION)-$(BUILD_NUMBER)

.PHONY: all
all: test build

.PHONY: clean
clean:; rm -rf $(output) tmp/*

.PHONY: server
server: 
	@ionic serve --all --nobrowser --labs

.PHONY: serve
serve:
	@$(MAKE) -j2 build.watch server

.PHONY: install
install: node_modules

node_modules: package.json
	@npm install
	@touch $@

.PHONY: test
test: install
	@mocha --require test/helper --recursive

.PHONY: test.watch
test.watch: install
	@mocha --require test/helper --recursive --reporter min --watch
