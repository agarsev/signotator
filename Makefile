all: test/bundle/code.js test/bundle/style.css

dist/bundle.js: index.js $(wildcard src/*) | dist
	npx esbuild --bundle $< --jsx=preserve --loader:.js=jsx --packages=external --format=esm --outfile=$@

test/bundle/code.js: test/main.js dist/bundle.js | test/bundle
	npx esbuild --bundle $< --jsx=automatic --loader:.js=jsx --outfile=$@

test/bundle/style.css: test/style.css $(wildcard src/*) | test/bundle
	npx postcss $< -o $@

test/bundle dist:
	@mkdir -p $@

clean:
	rm -rf test/bundle dist
