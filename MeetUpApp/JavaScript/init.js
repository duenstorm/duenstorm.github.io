/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(m) { 

    // The global jQuery object is passed as a parameter
  	m(window.jQuery, window, document);

  }(function($, window, document) {

    var search, searchArr, keyValue, results;
  
    $(function(){
        requests.category();
        requests.group(0, 20,"");
    });
  
  }
  ));

