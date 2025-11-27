build: lint compile test

compile:
	yarn tsc

lint:
	yarn lint

test:
	yarn test

rndebugger:
	open "rndebugger://set-debugger-loc?host=localhost&port=19001"
