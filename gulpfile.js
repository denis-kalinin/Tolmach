/*eslint strict: [2, "global"]*/
/*eslint global-strict: 0*/
/*eslint no-use-before-define: [2, "nofunc"]*/
/*eslint-env node*/
/*global __dirname*/

"use strict";

var gulp = require("gulp"),
	gutil = require("gulp-util"),
	path = require("path"),
	karma = require("karma"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify");

gulp.task("tdd", function(){
	function karmaServerCb(exitCode){
		gutil.log("Karma has exited with code", gutil.colors.red(exitCode));
	}
	var Server = karma.Server;
	var testServer = new Server({
		configFile: path.join(__dirname, "tests", "karma.conf.js"),
		client: {
			captureConsole: true
		}
	}, karmaServerCb); // for error handling with .on("error", function(){}) - use github.com/lazd/gulp-karma
	testServer.start();
});
gulp.task("copy:js", function(){
	return gulp.src(["src/tolmach.js"])
		.pipe(gulp.dest("dist"))
		.pipe(rename("tolmach.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});
gulp.task("default", ["tdd", "copy:js"]);
