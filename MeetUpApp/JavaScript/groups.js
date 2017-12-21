/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var groups = ( function(o) { 
        var obj = o(window.jQuery, window, document, requests);
        
        return{
            list:  obj.list,
            start:  obj.start,
            stop:  obj.stop,
            page:  obj.page
        };
        
    }( function($, window, document, req) {
        var page=1, maxPage=1, pageLoad=20, total, searchText="";

        var listGrp = function(response) {
            var line, colOne, colTwo, colThree, photo, descript, head, content, list, rowOne, rowTwo, location, link, linkValue;
            
            $("#groups .row, #groups > p").remove();
            total=response.meta.total_count;
            checkPage();
            myMap.clear();
            $("#head span, #foot span").text(page);
            
            if(response.data.length==0){
                $("#groups > p").remove();
                $("#head span, #foot span").text("");
                $("#groups").append("<p>No results found</p>");
            }
            
            $.each(response.data, function(index, value) {
                
                content=(value.description).substring(0, 200)+"...";
                content=content.replace(/<\/?[^>]+(>|$)/g, "");
                linkValue=value.link;
                
                line=$("<div></div>");
                line.addClass("row");
                
                colOne=$("<div></div>");
                colOne.addClass("col-md-3");
                
                colTwo=$("<div></div>");
                colTwo.addClass("col-md-6");
                
                colThree=$("<div></div>");
                colThree.addClass("col-md-3");
                
                photo=$("<img>");
                if ("group_photo" in value) {
                    photo.attr("src",value.group_photo.photo_link);
                } else {
                    photo.attr("src","Images/No_image_available.svg");
                }
                
                head=$("<h2></h2>");
                head.text(value.name);
                
                descript=$("<p></p>");
                descript.html(value.description);
                
                list=$("<ul></ul>");
                rowOne=$("<li></li>");
                rowTwo=$("<li></li>");
                location=$("<button id='location' type='button'>Location</button>");
                link=$("<a><button id='link' type='button'>Visit page</button></a>");
                
                link.attr({
                    href:  linkValue,
                    target:  "_blank"
                });
                
                location.attr({
                   "data-lat":  value.lat,
                   "data-lon":  value.lon
                });
                
                rowOne.append(location);
                rowTwo.append(link);
                list.append(rowOne, rowTwo);
                
                
                colTwo.append(head);
                colTwo.append(content);
                colOne.append(photo);
                colThree.append(list);
                
                line.append(colOne, colTwo, colThree);
                
                location.click( function() {
                    
                    moveRow($(this));
                    myMap.focus($(this).attr("data-lat"), $(this).attr("data-lon"));
                    
                });
                
                $("#groups").append(line);
                
                myMap.marker(value.lat, value.lon);
            });
        };
        
        var moveRow= function(button) {
            var row;
            
            $("#show .row").remove();
            
            row=button.parents(".row").clone(false);
            row.find("#location").text("Close");
            row.find("#location").click(function(){
                $("#show .row").remove();
                myMap._default();
            });
            
            $("#show").append(row);
            
            $("body, html").animate({
                scrollTop:$("#map").offset().top
            });
        };
        
        var checkPage= function() {
            
            $("#head .fa-caret-right, #foot .fa-caret-right, #head .fa-caret-left, #foot .fa-caret-left").css({
                opacity: 1,
                "pointer-events":"auto"
            });
            
            if (page==1) {
                $("#head .fa-caret-left, #foot .fa-caret-left").css({
                   opacity: 0,
                   "pointer-events":"none"
                });
            }
            
            if (page*pageLoad>=total) {
                $("#head .fa-caret-right, #foot .fa-caret-right").css({
                   opacity: 0,
                   "pointer-events":"none"
                });
            }
        };
        
        var startLd = function() {
            
            $("main .fa-circle-o-notch").css("opacity","1");
            
        };
        
        var stopLd = function() {
            
            $("main .fa-circle-o-notch").css("opacity","0");
            
        };
        
        var setPage = function(number) {
            
            page=number;
            req.group(page-1, pageLoad, searchText);
        
        };
        
        $("#head .fa-caret-right, #foot .fa-caret-right").click( function() {
            
            myMap._default();
            $("#show .row").remove();
            
            page++;
            req.group(page-1, pageLoad, searchText);
        
        });
        
        $("#head .fa-caret-left, #foot .fa-caret-left").click( function() {
            
            myMap._default();
            $("#show .row").remove();
            
            page--;
            req.group(page-1, pageLoad, searchText);
            
        });
        
        $("#foot .fa").click( function() {
            
           $("body, html").animate({
               scrollTop: $("#head").offset().top
           }); 
           
        });
        
        $("#head input").keyup( function() {
           searchText=$(this).val();
           page=1;
           req.group(page-1, pageLoad, searchText);
        });
        
        return{
            list:  listGrp,
            start:  startLd,
            stop:  stopLd,
            page:  setPage
        };
  
    }
));
