install:
	npm install

lint:
	npx eslint .
	
make gendiff:
	npx babel-node src/gendiff.js