install:
	npm ci

run:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run