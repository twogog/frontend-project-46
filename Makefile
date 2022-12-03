install:
	npm ci

run:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test
	
publish:
	npm publish --dry-run