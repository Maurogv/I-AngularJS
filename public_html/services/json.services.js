/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('jsonServices',['ngResource'])
  .factory('Icons', icons)
//  .factory('Strings', strings)
  .factory('CadutidiMusocco', cadutidiMusocco);
  
//strings.$inject=['$resource'];
icons.$inject=['$resource'];
cadutidiMusocco.$inject=['$resource'];

// AS
// .factory('Icon', ['$resource',
//  function($resource){
//  
//  code
//  
// }
//function strings($resource){
//    return $resource('json/:iconId.json', {}, {
//      get: {method:'GET', params:{iconId:'strings'}, isArray:false}
//   });
// };


 function icons($resource){
    return $resource('json/:iconId.json', {}, {
      get: {method:'GET', params:{iconId:'icons16x16'}, isArray:false}
   });
 };
    
 function cadutidiMusocco($resource){
    return $resource('json/caduti di Musocco.json', {}, {
      query: {method:'GET', isArray:true}
   });
  };