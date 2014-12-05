/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('stringsResource', [])
  .factory('Strings', strings);
      
function strings() {
  return {
         it_strings : {  indice: "Indice",
                         note : 'Note',        
                         elencoDomini:"Elenco dei domini della pagina",
                         dominiCollegamenti: "Domini dei collegamenti",
                         dominiFoto: "Domini delle foto" 
                      },
         en_strings : {  contents :"Contents",
                         notes : 'Notes',        
                         domainsList:"List of page domains",
                         linksDomains: "Links domains",
                         photosDomains: "Photo domains" 
                      },     
         strings  :   {  externalHyperlinkIcon : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII" 
             
         }
                      
  };
};
  
  
  
