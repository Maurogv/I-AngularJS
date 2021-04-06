/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('config',[])
	.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/proemio', {
			controller : 'appController',
			templateUrl : 'views/it/home/proemio.html',
			title : 'Proemio', 
			lang : 'it'
		})
		.when('/lacaduta', {
			controller : 'appController',
			templateUrl : 'views/it/racconto/la caduta.html',
			title : 'La caduta', 
			lang : 'it'
		})
		.when('/leprimevisitemediche', {
			controller : 'appController',
			templateUrl : 'views/it/racconto/le prime visite mediche.html',
			title : 'Le prime visite mediche', 
			lang : 'it'
		})
		.when('/incontroconilpoeta', {
			controller : 'appController',
			templateUrl : 'views/it/dante/incontro con il sommo poeta.html',
			title : "L'incontro con il sommo poeta", 
			lang : 'it'
		})
		.when('/introduzioneaConvivio', {
			controller : 'appController',
			templateUrl : 'views/it/dante/introduzione a Convivio.html',
			title : "Introduzione a Convivio",
			lang : 'it'
		})
		.when('/convivioTrattatoPrimo', {
			controller : 'appController',
			templateUrl : 'views/it/dante/convivio Trattato Primo.html',
			title : "Convivio - Trattato Primo",
			lang : 'it'
		})
		.when('/convivioTrattatoSecondo', {
			controller : 'appController',
			templateUrl : 'views/it/dante/convivio Trattato Secondo.html',
			title : "Convivio - Trattato Secondo", 
			lang : 'it'
		})
		.when('/commedia', {
			controller : 'appController',
			templateUrl : 'views/it/dante/commedia.html',
			title : "Commedia", 
			lang : 'it'
		})
		.when('/miecitazionidellaCommedia', {
			controller : 'appController',
			templateUrl : 'views/it/dante/mie citazioni della Commedia.html',
			title : "Commedia", 
			lang : 'it'
		})
		.when('/monumentoaicaduti', {
			controller : 'appController',
			templateUrl : 'views/it/luoghi/monumento ai caduti.html',
			title : 'Monumento ai caduti', 
			lang : 'it'
		})
		.when('/monumentoaicadutidiMusocco', {
			controller : 'cadutidiMusoccoController',
			templateUrl : 'views/it/luoghi/monumento ai caduti di Musocco.html',
			title : 'Monumento ai caduti di Musocco',
			lang : 'it'
		})
		.when('/eliminazioneMonumentoaicadutidiMusoccosuWikipedia', {
			controller : 'appController',
			templateUrl : 'views/it/luoghi/eliminazione Monumento ai caduti di Musocco su Wikipedia.html',
			title : 'Eliminazione Monumento ai caduti di Musocco su Wikipedia', 
			lang : 'it'
		})
		.when('/eliminazioneMonumentoaicadutidefinizionesuWikipedia', {
			controller : 'appController',
			templateUrl : 'views/it/luoghi/eliminazione Monumento ai caduti definizione su Wikipedia.html',
			title : 'Eliminazione Monumento ai caduti (definizione) su Wikipedia', 
			lang : 'it'
		})
		.when('/about', {
			controller : 'appController',
			templateUrl : 'views/it/home/about.html',
			title : 'About',
			lang : 'it'
		})
		.when('/preamble', {
			controller : 'appController',
			templateUrl : 'views/en/home/preamble.html',
			title : 'Preamble',
			lang : 'en'
		})
		.when('/thefall', {
			controller : 'appController',
			templateUrl : 'views/en/story/the fall.html',
			title : 'The fall',
			lang : 'en'
		})
		.when('/thefirstphysicalexaminations', {
			controller : 'appController',
			templateUrl : 'views/en/story/the first physical examinations.html',
			title : 'The first physical examinations',
			lang : 'en'
		})
		.when('/mymeetingwiththepoet', {
			controller : 'appController',
			templateUrl : 'views/en/dante/my meeting with the poet.html',
			title : "My meeting with the poet",
			lang : 'en'
		})
		.when('/introductiontoConvivio', {
			controller : 'appController',
			templateUrl : 'views/en/dante/introduction to Convivio.html',
			title : "Introdution to Convivio",
			lang : 'en'
		})
		.when('/convivioBookOne', {
			controller : 'appController',
			templateUrl : 'views/en/dante/convivio Book One.html',
			title : "Convivio - Book One",
			lang : 'en'
		})
		.when('/convivioBookTwo', {
			controller : 'appController',
			templateUrl : 'views/en/dante/convivio Book Two.html',
			title : "Convivio - Book Two",
			lang : 'en'
		})
		.when('/comedy', {
			controller : 'appController',
			templateUrl : 'views/en/dante/comedy.html',
			title : "Comedy",
			lang : 'en'
		})
		.when('/myquotesontheComedy', {
			controller : 'appController',
			templateUrl : 'views/en/dante/my quotes on the Comedy.html',
			title : "My quotes on the Comedy",
			lang : 'en'
		})
		.when('/warmemorialofMusocco', {
			controller : 'cadutidiMusoccoController',
			templateUrl : 'views/en/places/war memorial of Musocco.html', 
			title:'War Memorial of Musocco',
			lang : 'en'
		})
		 .when('/en-about', {
			controller : 'appController',
			templateUrl : 'views/en/home/about.html',
			title : 'About',
			lang : 'en'
		})
		.when('index', {
			redirectTo : '/proemio'
		})
		.otherwise({
			redirectTo : '/proemio'
		});
}]);

// NOT WORKING
// angular.module('config',['ngRoute'])  
// .config('Config', appConfig);
//   
// appConfig.$inject=['$routeProvider'];
//
// function appConfig ($routeProvider){
//
//  code
//
//  }
