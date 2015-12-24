/*global angular*/
/*eslint strict: 0*/
/*eslint no-use-before-define: [2, "nofunc"]*/
/**
 * Tolmach service (tolmach ~ translator, in old Russian)
 */

( function () {
	"use strict";
	angular
		.module("itranga.tolmach", ["pascalprecht.translate", "ngSanitize"])
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
						//.registerAvailableLanguageKeys(Object.keys(languages), {});
				}
			}
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
			.useSanitizeValueStrategy("sanitize");

		var rosettaStone = {};

		this.getTranslateProvider = function(){
			return $translateProvider;
		};

		this.setTranslations = function(value){
			if(value){
				rosettaStone = value;
				return true;
			}
			return false;
		};
		this.getTranslations = function(){
			return rosettaStone;
		};

		this.$get = ["$translate", Tolmach];

		function Tolmach($translate){
			mtlProvider.setTranslations(rosettaStone);
			var service = {
				addTranslations: addTranslations
			};
			return service;

			function addTranslations(newTranslations){
				rosettaStone = angular.merge(rosettaStone, newTranslations);
				mtlProvider.setTranslations(rosettaStone);
				$translate.refresh();
				return rosettaStone;
			}
		}
	}
})();
