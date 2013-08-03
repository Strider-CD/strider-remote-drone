
test: lint
	@./node_modules/.bin/mocha -R spec

lint:
	@./node_modules/.bin/jshint --verbose *.js *.json lib/*.js test/*.js

.PHONY: test lint
