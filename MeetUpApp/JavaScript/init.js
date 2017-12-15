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
  
    $(function() {

      // The DOM is ready!

    });
    
    search=$(location).attr("hash");
    search=search.replace("#","");
    searchArr=search.split("&");
    console.log(searchArr.length);
    if(searchArr.length<2){
        $(location).attr("href", "https://secure.meetup.com/oauth2/authorize?client_id=k2a9mnqnc4mlvoggjtlhu8p24h&response_type=token&redirect_uri=https://duenstorm.github.io/MeetUpApp");
    
    }
    else{
	    /*
        keyValue=searchArr[0];
        keyValue=keyValue.substring((keyValue.indexOf("=")+1),keyValue.length);
        $.get("https://api.meetup.com/2/categories",{"access_token":keyValue}, function(data, status){
            document.write(data);
            document.write(status);
        });
*/
        $.ajax({
          type: "GET",
          beforeSend: function(request) {
            request.setRequestHeader("Access-Control-Allow-Origin", "https://duenstorm.github.io/MeetUpApp");
          },
          url: "https://api.meetup.com/2/categories/",
          data: "access_token="+keyValue,
          success: function(msg) {
            document.write(msg);
          }
        });
		
    }
   
    
    

  }
  ));


