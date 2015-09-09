requirements:
	npm install -g bower cordova gulp node-sass
install:
	@echo "If something is failling, try \"make requirements\""
	npm install
	bower install
	gulp build
	cordova prepare
run:
	gulp
clean:
	rm -rf node_modules
	rm -rf platforms
	rm -rf plugins
	rm -rf www
	make install