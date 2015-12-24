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

	function ModuleTranslationsLoaderProvider(){
		var translations = {};
		this.getTranslations = function(){
			return translations;
		};
		this.setTranslations = function(value){
			if(value){
				translations = value;
			}
		};
		this.$get = ["$q", function ($q){
			return function getBundleTranslation(options){
				var langId = options.key.toUpperCase();
				var deferred = $q.defer();
				if( translations && translations[langId] ){
					deferred.resolve( translations[langId] );
				}else{
					deferred.reject();
				}
				return deferred.promise;
			};
		}];
	}

	function TolmachProvider($translateProvider, mtlProvider){
		$translateProvider
			.useLoader("ModuleTranslationsLoader")
			.useSanitizeValueStrategy("sanitize");

		var rosettaStone = {FR: {Hello: "Salut Mond!"}};

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
