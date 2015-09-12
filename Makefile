install:
	npm install
	bower install
	cordova prepare

run:
	gulp

clean:
	rm -rf platforms
	rm -rf plugins
	cordova prepare

emulate:
	gulp sass
	cordova emulate ios --target="iPhone-5"

build:
	cordova build ios