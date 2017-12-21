

var categories = (function(o) { 

        var obj = o(window.jQuery, window, document);
        
        return{
            list:  obj.list,
            start:  obj.start,
            stop:  obj.stop
        };
        
    }( function ($, window, document) {

        var list="";

        var listCat = function(response) {
            var line, colOne, colTwo, box;
            
            $.each(response.results, function(index, value) {
                
                line=$("<div></div>");
                line.addClass("row");
                
                colOne=$("<div></div>");
                colOne.addClass("col-11");
                
                colTwo=$("<div></div>");
                colTwo.addClass("col-1");
                
                box=$("<input>");
                box.attr("type","checkbox");
                box.addClass("check");
                
                colOne.text(value.name);
                box.attr("id",value.id);
                
                colTwo.append(box);
                
                line.append(colOne);
                line.append(colTwo);
                
                
                $("#categories").append(line);
            });
            
            $("#categories input[type='checkbox']").click( function() {
                
                selectBox($(this));
                document.cookie=list;
                groups.page(1);
                
            });
            
            dumpBox($("#categories"));
        };
        
        var selectBox = function(box) {
            var item, listArray, itemIndex;
            
            item=box.attr("id");
            
            if (box.prop("checked")===true) {
                if (list===""){
                    list+=item;
                } else {
                    list+=","+item;
                }
            } else {
                listArray=list.split(',');
                itemIndex=listArray.indexOf(item);
                listArray.splice(itemIndex, 1);
            
                list=listArray.join();
            }
        };
        
        var dumpBox= function(body) {
            var listArray;
            
            list=document.cookie;
            
            listArray=list.split(",");
            $.each(listArray, function(index, value) {
                
                body.find("input[id='"+value+"']").attr("checked","checked");
            
            });
            
        };
        
        var startLd = function() {
            
            $(".modal .fa-circle-o-notch").css("opacity","1");
            
        }
        
        var stopLd = function() {
            
            $(".modal .fa-circle-o-notch").css("opacity","0");
            
        }
        
        return{
            list:  listCat,
            start:  startLd,
            stop:  stopLd
            };
  
    
    }
));



