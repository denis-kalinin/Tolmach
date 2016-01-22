/*global angular*/
/*eslint strict: 0*/
/*eslint no-use-before-define: [2, "nofunc"]*/
/**
 * Tolmach service (tolmach ~ translator, in old Russian)
 */

( function () {
	"use strict";
	angular
		.module("itranga.tolmach", ["pascalprecht.translate"])
		.provider("ModuleTranslationsLoader", ModuleTranslationsLoaderProvider)
		.provider("tolmach", TolmachProvider);

	TolmachProvider.$inject = ["$translateProvider", "ModuleTranslationsLoaderProvider"];
	ModuleTranslationsLoaderProvider.$inject = ["$translateProvider"];

	function ModuleTranslationsLoaderProvider($translateProvider){
		var translations = {};
		var languages = {};
		this.getTranslations = function(){
			return translations;
		};
		this.setTranslations = function(value){
			if(value){
				for (var quirkKey in value){
					if (quirkKey !== quirkKey.toUpperCase()) {
						var newKey = quirkKey.toUpperCase();
						Object.defineProperty(value, newKey,
							Object.getOwnPropertyDescriptor(value, quirkKey));
						delete value[quirkKey];
					}
				}
				translations = value;
				var updateTranslator = false;
				for (var key in translations) {
					if (translations.hasOwnProperty(key)) {
						key = key.toLowerCase();
						if(!languages[key]){
							languages[key] = {};
							updateTranslator = true;
						}
					}
				}
				if(updateTranslator){
					$translateProvider
						.fallbackLanguage(Object.keys(languages));
				}
			}
			return translations;
		};
		this.$get = ["$q", function ($q){
			return function getBundleTranslation(options){
				var langId = options.key.toUpperCase();
				var deferred = $q.defer();
				if( translations && translations[langId] ){
					deferred.resolve( translations[langId] );
				}else{
					deferred.reject(options);
				}
				return deferred.promise;
			};
		}];
	}

	function TolmachProvider($translateProvider, mtlProvider){
		$translateProvider
			.useLoader("ModuleTranslationsLoader")
			.useSanitizeValueStrategy("escape");

		this.getTranslateProvider = function(){
			return $translateProvider;
		};

		this.setTranslations = function(value){
			return mtlProvider.setTranslations(value);
		};
		this.getTranslations = function(){
			return mtlProvider.getTranslations();
		};

		this.$get = ["$translate", Tolmach];

		function Tolmach($translate){
			var service = {
				addTranslations: addTranslations
			};
			return service;

			function addTranslations(newTranslations){
				var rosettaStone = mtlProvider.setTranslations(
						angular.merge(mtlProvider.getTranslations(), newTranslations)
					);
				$translate.refresh();
				return rosettaStone;
			}
		}
	}
})();
