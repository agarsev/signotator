all: dist/bundle.js docs/bundle/code.js docs/bundle/style.css

dist/bundle.js: index.js $(wildcard src/*) | dist
	npx esbuild --bundle $< --jsx=preserve --loader:.js=jsx --packages=external --format=esm --outfile=$@

docs/bundle/code.js: docs/main.js dist/bundle.js | docs/bundle
	npx esbuild --bundle $< --jsx=automatic --loader:.js=jsx --outfile=$@

docs/bundle/style.css: docs/style.css style.css $(wildcard src/*) | docs/bundle
	npx postcss $< -o $@

docs/bundle dist:
	@mkdir -p $@

clean:
	rm -rf docs/bundle dist
