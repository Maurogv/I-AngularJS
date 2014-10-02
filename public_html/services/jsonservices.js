/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('jsonServices',['ngResource'])
  .factory('Icon', icon)
  .factory('Page', page)
  .factory('CadutidiMusocco', cadutidiMusocco);
  
icon.$inject=['$resource'];
page.$inject=['$resource'];
cadutidiMusocco.$inject=['$resource'];

// AS
// .factory('Icon', ['$resource',
//  function($resource){
//  
//  code
//  
// }

 function icon($resource){
    return $resource('json/:iconId.json', {}, {
      get: {method:'GET', params:{iconId:'social'}, isArray:false}
   });
 };
   
 function page($resource){
    return $resource('json/page.json', {}, {
      query: {method:'GET', isArray:true}
   });
  };
  
 function cadutidiMusocco($resource){
    return $resource('json/caduti di Musocco.json', {}, {
      query: {method:'GET', isArray:true}
   });
  };