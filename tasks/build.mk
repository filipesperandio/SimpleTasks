.PHONY: watch
build.watch: node_modules/nodemon
	@nodemon --quiet --ext html,js,json,scss,css --watch $(source)/ --ignore $(source)/lib --exec '$(MAKE) build'

.PHONY: build
build: javascript stylesheet rest

.PHONY: javascript
javascript: node_modules/debowerify node_modules/configurify node_modules/browserify $(output_js) 

.PHONY: ENV.%
ENV.%:
	scripts/misc/gen.var.sh $* $($*) > tmp/$*

output_js_dependencies = node_modules $(bower) $(source_js)
ifneq ($(CONNECT_HOST),$(shell test -e tmp/CONNECT_HOST && cat tmp/CONNECT_HOST))
output_js_dependencies += ENV.CONNECT_HOST
endif

ifneq ($(APP_TAG),$(shell test -e tmp/APP_TAG && cat tmp/APP_TAG))
output_js_dependencies += ENV.APP_TAG
endif

ifneq ($(ENV_LABEL),$(shell test -e tmp/ENV_LABEL && cat tmp/ENV_LABEL))
output_js_dependencies += ENV.ENV_LABEL
endif

ifneq ($(BUILD_NUMBER),$(shell test -e tmp/BUILD_NUMBER && cat tmp/BUILD_NUMBER))
output_js_dependencies += ENV.BUILD_NUMBER
endif

$(output_js): $(output_js_dependencies)
	@mkdir -p $(dir $@)
	@echo 'Executing browserify...'
	@APP_TAG=$(APP_TAG) browserify $(source)/index.js \
		--transform [ configurify --pattern '**/config/*' ] \
		--transform [ debowerify ] \
		--outfile $@

.PHONY: stylesheet
stylesheet: $(output_css)

$(output_css): node_modules $(bower) $(source_css)
	@mkdir -p $(dir $@)
	@echo 'Executing node-sass...'
	@node-sass $(source)/index.scss | postcss \
		--use autoprefixer \
		--autoprefixer.browsers 'last 2 versions' \
		--output $@

.PHONY: rest
rest: $(output_rest)

$(output)/%: $(source)/%
	@mkdir -p $(dir $@)
	cp $< $@

config_xml_dependencies = $(source)/config.xml
ifneq ($(APP_NAME),$(shell test -e tmp/APP_NAME && cat tmp/APP_NAME))
config_xml_dependencies += ENV.APP_NAME
endif

ifneq ($(ENV_LABEL),$(shell test -e tmp/ENV_LABEL && cat tmp/ENV_LABEL))
config_xml_dependencies += ENV.ENV_LABEL
endif

ifneq ($(BUILD_NUMBER),$(shell test -e tmp/BUILD_NUMBER && cat tmp/BUILD_NUMBER))
config_xml_dependencies += ENV.BUILD_NUMBER
endif

ifneq ($(APP_VERSION),$(shell test -e tmp/APP_VERSION && cat tmp/APP_VERSION))
config_xml_dependencies += ENV.APP_VERSION
endif

$(output)/config.xml: $(config_xml_dependencies)
	@echo 'Regenerating config.xml...'
	@mkdir -p $(dir $@)
	@cp $< $@
	@scripts/build/replace.variables $@

index_html_dependencies = $(source)/index.html
ifneq ($(NEWRELIC_LICENSE_KEY),$(shell test -e tmp/NEWRELIC_LICENSE_KEY && cat tmp/NEWRELIC_LICENSE_KEY))
index_html_dependencies += ENV.NEWRELIC_LICENSE_KEY
endif

ifneq ($(NEWRELIC_APPLICATION_ID),$(shell test -e tmp/NEWRELIC_APPLICATION_ID && cat tmp/NEWRELIC_APPLICATION_ID))
index_html_dependencies += ENV.NEWRELIC_APPLICATION_ID
endif

$(output)/index.html: $(index_html_dependencies)
	@echo 'Regenerating index.html...'
	@mkdir -p $(dir $@)
	@cp $< $@
	@scripts/build/replace.variables $@

.PHONY: build.canary
build.canary:; @scripts/build/canary
