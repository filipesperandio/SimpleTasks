.PHONY: install
install: node_modules $(bower)

node_modules: package.json
	@npm install
	@touch $@

node_modules/%:
	@npm install $*

$(bower): node_modules bower.json
	@bower install --allow-root
	@touch $@
