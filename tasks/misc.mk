.PHONY: swap.node.modules
swap.node.modules:
	@scripts/misc/swap.node.modules

.PHONY: ctags
ctags:
	@ctags -R --exclude=node_modules* --exclude=src/lib/**/*
