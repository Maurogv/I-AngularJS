/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

   angular.module('config',[])
   .config(['$routeProvider', function($routeProvider){
    $routeProvider    
        .when('/preambolo', {
            controller : 'appController',
            templateUrl : 'views/it/home/preambolo.html',
            title : 'Preambolo', 
            lang : 'it'
        })       
        .when('/dante', {
            controller : 'appController',
            templateUrl : 'views/it/maestri/dante.html',
            title : 'Dante', 
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
        .when('/en-dante', {
            controller : 'appController',
            templateUrl : 'views/en/maestroes/dante.html',
            title : 'Dante', 
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
            redirectTo : '/preambolo'
        })
        .otherwise({
            redirectTo : '/preambolo'
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
