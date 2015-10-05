.PHONY: test
test: install
	@mocha --require test/helper --recursive

.PHONY: test.watch
test.watch: install
	@mocha --require test/helper --recursive --reporter min --watch

.PHONY: integration.dev
integration.dev:
	@$(MAKE) -j2 selenium integration

.PHONY: integration
integration: node_modules
	@scripts/test/protractor

.PHONY: selenium
selenium: node_modules
	@webdriver-manager update
	@webdriver-manager start >selenium_webdriver.log 2>&1

.PHONY: lint
lint: install
	@jshint $(source_js) --reporter 'node_modules/jshint-stylish'
