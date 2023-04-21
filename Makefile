install:
	npm install
lint:
	npx eslint .
gendiff:
	npx babel-node src/bin/gendiff.js