/*eslint no-use-before-define: [2, "nofunc"]*/
/*eslint-env node, mocha */
/*global angular, chai, console*/
/*eslint no-unused-vars: 1*/
/**
 * Unit-test for Tolmach.js
 */
describe("Tolmach.js testing", function () {
	"use strict";

	var translations = {EN: {Hello: "Hello world!"}, "ES": {Hello: "¡Hola, mundo!"}, ET: {}};

/*
	beforeEach(function loadProvider() {
		// Initialize the service provider
		// by injecting it to a fake module's config block
		var fakeModule = angular.module("test.app.config", function () {});
		fakeModule.config( function (configProvider) {
			theConfigProvider = configProvider;
		});
		// Initialize test.app injector
		module("app.config", "test.app.config");
		// Kickstart the injectors previously registered
		// with calls to angular.mock.module
		inject(function () {});
	});
*/
	var $tolmachProvider, tolmach, mtl, $translate, $log, $rootScope;

	beforeEach(function loadModules(){
		console.log("Loading tolmach");
		angular.mock.module("itranga.tolmach", function(tolmachProvider, $provide){
			//$provide.value("$log", console);
			var test2 = chai.expect(tolmachProvider).to.exist;
			var $translateProvider = tolmachProvider.getTranslateProvider();
			//$translateProvider.useLoader("ModuleTranslationsLoader");
			//$translateProvider.useSanitizeValueStrategy("sanitize");
			//$translateProvider.useSanitizeValueStrategy("escape"); //escapeParameters, sanitizeParameters
			//$translateProvider.useLocalStorage();
			//$translateProvider.fallbackLanguage(["en"]);
			//.registerAvailableLanguageKeys(["en", "ru", "es", "it"], {});// {"en_*": "en", "ru_*": "ru"});
			$translateProvider.preferredLanguage("en");
			$tolmachProvider = tolmachProvider;
			//var result = $tolmachProvider.setTranslations({});//translations);
			//var test4 = chai.expect(result).to.exist;
			//var test5 = chai.expect(tolmachProvider.getTranslations()).to.exist;
			//var test6 = chai.expect(tolmachProvider.getTranslations()).to.equal(translations);
		});

		angular.mock.inject(function(_$log_, _$rootScope_, _$translate_, ModuleTranslationsLoader, _tolmach_){
			$log = _$log_;
			$rootScope = _$rootScope_;
			$translate = _$translate_;
			mtl = ModuleTranslationsLoader;
			tolmach = _tolmach_;
		});
	});

	describe("Tolmach provider configuration", function(){

		it("module \"itranga.tolmach\" is loaded", function (done) {
			var test1 = chai.expect(angular.module("itranga.tolmach")).to.exist;
			done();
		});

		it("Add undefined translation to Tolmach", function(){
			tolmach.addTranslations();
		});

		it("Add null translation to Tolmach", function(){
			tolmach.addTranslations(null);
		});

		it("Adding translation to \"Tolmach\"", function(done){
			var test1 = chai.expect(tolmach).to.exist;
			tolmach.addTranslations({
					"rU": {Hello: "Привет мир!"},
					Es: {}
			});
			var rosetta = tolmach.getTranslations();
			console.log(rosetta);
			var result = chai.expect(Object.getOwnPropertyNames(rosetta).length).to.equal(2);
			var promise = mtl({key: "ru"});
			promise.then(function (data){
				$log.info("TranslationProvider: ", data);
				done();
			}).catch(function (e){
				throw new Error("Failed to find translation");
			});
			$rootScope.$digest();
		});
		it("Add Russian \"Привет мир!\"", function(done){
			var rosetta = tolmach.addTranslations({"RU": {Hello: "Привет мир!"}});
			//tolmach.addTranslations({"RU": {Hello2: "Привет мир!"}});
			$translate.use("ru");
			var currentLang = $translate.proposedLanguage() || $translate.use();
			var test1 = chai.expect(currentLang).to.be.exist;
			var test2 = chai.expect(currentLang).to.be.equal("ru");
			var promise = $translate("Hello");
			promise.then(function(data){
				data.should.be.equal(tolmach.getTranslations().RU.Hello);
				//data.should.be.equal("Привет мир!");
				done();
			}).catch(function (e){
				throw new Error("Failed to process TRANSLATION promise! Key: " + e);
			});
			$rootScope.$digest();
		});
		it("Add Spanish \"¡Hola, mundo!\"", function(done){
			tolmach.addTranslations({ET: {Hello: "Tere!"}, "ES": { Hello: "¡Hola, mundo!"}});
			$translate.use("es");
			var currentLang = $translate.proposedLanguage() || $translate.use();
			var test = chai.expect(currentLang).to.be.exist;
			var test2 = chai.expect(currentLang).to.be.equal("es");
			var promise = $translate("Hello");
			promise.then(function(data){
				data.should.be.equal(tolmach.getTranslations().ES.Hello);
				done();
			}).catch(function (e){
				$log.error("Rejected: ", e);
				throw new Error("Failed to process TRANSLATION promise!");
			});
			tolmach.addTranslations({IT: {Hello: "Salve!"}});
			$rootScope.$digest();
		});
	});
});
