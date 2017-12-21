/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myMap= (function(o) { 

        var obj=o(window.jQuery, window, document, google);
        
        return{
            map: obj.map,
            marker: obj.marker,
            clear: obj.clear,
            focus: obj.focus,
            _default: obj._default
        };
        
    }(function($, window, document, google) {
        
        var markers=[], zoom=8, position=new google.maps.LatLng(-26.1713505,27.9699837);
        
        var prop={
            center:position,
            zoom: zoom
        };
        
        var map=new google.maps.Map(document.getElementById("map"),prop);
        
        var setDefault=function(){
            map.setZoom(zoom);
            map.setCenter(position);
        };
        
        var addMarker=function(lat, long){
            var location, marker;
            
            location=new google.maps.LatLng(lat, long);
            marker=new google.maps.Marker({position: location});
            markers.push(marker);
            marker.setMap(map);
        };
        
        var clearMarkers=function(){
            $.each(markers, function(index, value){
                value.setMap(null);
            });
        };
        
        var setFocus=function(lat, long){
            var center, marker;
            console.log("focusing on "+lat+", "+long);
            center=new google.maps.LatLng(lat,long);
            map.panTo(center);
            marker=new google.maps.Marker({position: center});
            marker.setMap(map);
            map.setZoom(15);
        };
        
        return{
            map: map,
            marker: addMarker,
            clear: clearMarkers,
            focus: setFocus,
            _default: setDefault
        };
  
    
    }
));