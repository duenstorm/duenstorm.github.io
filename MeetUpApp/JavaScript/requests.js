/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var requests = (function(o) {
    
        var obj = o(window.jQuery, window, document);
        
        return{
            category: obj.category,
            group: obj.group
        };
        
    } (function($, window, document) {

        var getCat = function() {
            
            categories.start();
            $.getScript("https://api.meetup.com/2/categories.json?callback=categories.list&key=62f4a1f5b4d386e2b542e1465a2133", function(script, status, obj){
                
                categories.stop();
                
                if(status!="success"){
                    alert("an error has occured, please try again later.")
                }
                
            });    
        };
        
        var getGroups = function(pageNumber, pageSize, searchText) {
            var list, searchVal="";
            
            groups.start();
            list=document.cookie;
            
            if (searchText.length>0) {
                searchVal="&text="+searchText;
            }
            
            $.getScript("https://api.meetup.com/find/groups?callback=groups.list&country=ZA&location=Johannesburg&category="+list+"&page="+pageSize+searchVal+"&offset="+pageNumber+"&key=62f4a1f5b4d386e2b542e1465a2133", function(script, status, obj){
                
                groups.stop();
                
                if(status!="success"){
                    alert("an error has occured, please try again later.")
                }
            });
        }
        
        return{
          category:  getCat,
          group:  getGroups
        };
  
    
    }
));


