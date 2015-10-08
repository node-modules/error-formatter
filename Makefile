TESTS = test/*.test.js
REPORTER = tap
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install --registry=http://registry.npm.taobao.org

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--harmony\
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		$(MOCHA_OPTS) \
		$(TESTS)

.PHONY: test
