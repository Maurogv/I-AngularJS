/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('controllers',[])  
   .controller('CadutidiMusoccoController', cadutidiMusoccoController)
   .controller('AppController', appController)
   .controller('NavController', navController)
   .controller('BackToTopController', backToTopController);
   
   appController.$inject=['$scope', '$route', '$rootScope', '$location', '$compile', 'Icons', 'Strings' ];
   // as
   // .controller('AppController',  
   // function($scope, $route, $location, Icon, Page, CadutidiMusocco) {
   // 
   // code
   // 
   // })
   
   function appController( $scope, $route, $rootScope, $location, $compile, Icons, Strings) {
         
       $rootScope.$on('routechanged',function(event,args) {
          $scope.strings = Strings[args.lang + "_strings"]; 
          $scope.languageInvariantStrings=Strings.strings;
       });        
      
        $scope.$on('$routeChangeSuccess', function (ev, current, prev) {      
            $scope.pagetitle=$route.current.title;
            $rootScope.$broadcast('routechanged',{lang: $route.current.lang});
        }); 
        
        $scope.myrefcounter=1;
        I.backToTop();
        I.activeNav($location.path());
        I.createContents($location.path(), $compile, $scope);
        I.domainsList($compile, $scope);     
        I.prependIcons(Icons);        
    };         
     
    navController.$inject=['$scope','$rootScope' ];
    function navController($scope, $rootScope) 
    { 
        var views="views/";
        var partial="/partials/navigation.html";
        
        $rootScope.$on('routechanged',function(event,args) {
              $scope.lang=views + args.lang  + partial;
         });      
    };
    
    backToTopController.$inject=['$scope','$rootScope' ];
    function backToTopController($scope, $rootScope) 
    { 
        var views="views/";
        var partial="/partials/backToTop.html";
        
        $rootScope.$on('routechanged',function(event,args) {
              $scope.lang=views + args.lang  + partial;
         });      
    };
      
   cadutidiMusoccoController.$inject=['$injector', '$scope', 'CadutidiMusocco'];

   function cadutidiMusoccoController($injector, $scope, CadutidiMusocco) {
      var cadutidiMusocco=[];
      CadutidiMusocco.query(function (response)
      {
         response.forEach (function(caduto){
         cadutidiMusocco.push ({ fullname:caduto["0"], 
                                annodinascita:caduto["1"],
                                annodimorte:caduto["2"]
                                });         
         })            
         $scope.firststoneindex=cadutidiMusocco.map(function(e) { return e.fullname; }).indexOf('Gatti Luigi');
         $scope.secondstonecolumnlength=parseInt((cadutidiMusocco.length - $scope.firststoneindex)/3+1)-1;
      });

      $scope.cadutidiMusocco=cadutidiMusocco;
      
      $injector.invoke(appController, this, {
        $scope: $scope,
     });
   }

   
     
      