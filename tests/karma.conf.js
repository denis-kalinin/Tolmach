/*eslint strict: [2, "global"]*/
/*eslint global-strict: 0*/
/*global module*/
"use strict";
module.exports = function(config) {
	config.set({

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: "../",

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ["mocha", "chai-as-promised", "chai"],
	//frameworks: ["mocha", "chai"],


// list of files / patterns to load in the browser
	files: [
		{pattern: "bower_components/angular/angular.js", watched: false},
		{pattern: "bower_components/angular-mocks/angular-mocks.js", watched: false},
		{pattern: "bower_components/angular-translate/angular-translate.js", watched: false},
		{pattern: "bower_components/angular-sanitize/angular-sanitize.js", watched: false},
		{pattern: "src/**/*.js"}
	],


	// list of files to exclude
	exclude: [],


	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	//preprocessors: {
	//	"src/GoogleSheetService.js": ["coverage"]
	//},


	// test results reporter to use
	// possible values: "dots", "progress", "spec"
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	//reporters: ["mocha", "coverage"],
	reporters: ["mocha"],

	plugins: ["karma-mocha",
	"karma-chai",
	"karma-chai-as-promised",
	"karma-mocha-reporter",
	//"karma-coverage",
	"karma-phantomjs-launcher"],


	// web server port
	port: 9876,


	// enable / disable colors in the output (reporters and logs)
	colors: true,


	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_INFO,


	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: false,

	captureTimeout: 10000,
	browserNoActivityTimeout: 3000,
	reportSlowerThan: 500,

	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	browsers: ["PhantomJS"],


	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: true
	});
};
