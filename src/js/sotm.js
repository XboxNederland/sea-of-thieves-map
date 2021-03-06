import * as pwa from './modules/pwa.js';
import * as island_data from './modules/island_data.js';
import * as throne_data from './modules/throne_data.js';


var layerArray = [];
var islands = island_data.islands;
var thrones = throne_data.thrones;
var isOnline = pwa.isOnline;

console.log("-- detect isOnline: " + isOnline);

var cdnpath = "";
if (location.hostname != "localhost") {
    cdnpath = "https://cdn.chenzorama.com/";
}

var map = L.map("mapid", {
    maxZoom: 7,
    minZoom: 2,
    crs: L.CRS.Simple,
    attributionControl: false,
    preferCanvas: false
}).setView([70, 70], 4);

var bounds = new L.LatLngBounds(map.unproject([0, 20924], 7), map.unproject([20924, 0], 7));

map.fitBounds(bounds);


var layer = L.tileLayer(cdnpath + "images/tiles/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 7,
    bounds: bounds,
    noWrap: !0,
    tms: !1
}).addTo(map);


map.setMaxBounds(bounds, {padding: [200,200]});




var userMarkersLayer = new L.LayerGroup();
map.addLayer(userMarkersLayer);


var xmarksspot = L.icon({
    iconUrl: '/images/markers/xmarkthespot_marker.png',
    shadowUrl: '/images/markers/xmarkthespot_marker.png',
    
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

function onMapClick(e) {
    console.log("You clicked the map at " + e.latlng);

}

map.on('click', onMapClick);




var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);

var chickensLayer = new L.LayerGroup();
//map.addLayer(chickensLayer);
layerArray.push(['chickens', chickensLayer]);

var snakesLayer = new L.LayerGroup();
//map.addLayer(snakesLayer);
layerArray.push(['snakes', snakesLayer]);

var pigsLayer = new L.LayerGroup();
//map.addLayer(pigsLayer);
layerArray.push(['pigs', pigsLayer]);

var controlSearch = new L.Control.Search({
    position:'topright',		
    layer: markersLayer,
    initial: false,
    zoom: 4,
    marker: false
});
map.addControl( controlSearch );

/* customCircleMarker = L.CircleMarker.extend({
    options: { 
       someCustomProperty: 'Custom data!',
       anotherCustomProperty: 'More data!'
    }
 }); */

 //use circlemarker?

var chicken_marker = L.icon({
    iconUrl: '/images/markers/chicken_marker.png',
    shadowUrl: '/images/markers/chicken_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [0, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


var snake_marker = L.icon({
    iconUrl: '/images/markers/snake_marker.png',
    shadowUrl: '/images/markers/snake_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var pig_marker = L.icon({
    iconUrl: '/images/markers/pig_marker.png',
    shadowUrl: '/images/markers/pig_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [30, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});



for(var i in islands) {
    var title = islands[i].title;
    var cRad = islands[i].radius;


    var circle = L.circle(islands[i].loc, {
        //color: 'red',
        strokeweight: 1,
        opacity: 0,
        color: '#fff',
        fillColor: '#fff',
        fillOpacity: 0,
        radius: cRad,
        className: 'islandClass',
        title: title,
        //draggable: true
    })//.bindPopup(title);
    markersLayer.addLayer(circle);

    if (islands[i].chickens) {

        var chickenLoc = modifyLoc(islands[i].loc, cRad * 0.5, cRad * 0.6);

        var marker = L.marker(chickenLoc, { 
            icon: chicken_marker,
            title: 'chicken'  
        } 
        ).addTo(chickensLayer);
        marker.setIcon(chicken_marker);

    }

    if (islands[i].snakes) {

        var snakeLoc = modifyLoc(islands[i].loc, cRad * 0.5, (cRad * 0.6) * -1);

        var marker = L.marker(snakeLoc, { 
            icon: snake_marker,
            title: 'snake'  
        } 
        ).addTo(snakesLayer);

        
    }

    if (islands[i].pigs) {

        var pigLoc = modifyLoc(islands[i].loc, (cRad * 0.5) * -1, (cRad * 0.6) * -1);

        var marker = L.marker(pigLoc, { 
            icon: pig_marker,
            title: 'pigs'  
        } 
        ).addTo(pigsLayer);

        
    }
}



//add thrones
var thronesLayer = new L.LayerGroup();
layerArray.push(['thrones', thronesLayer]);

var throne_icon = L.icon({
    iconUrl: '/images/markers/throne_marker.png',
    shadowUrl: '/images/markers/throne_marker.png',

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [-20, -45] // point from which the popup should open relative to the iconAnchor
});

for(var t in thrones) {
    var loc = thrones[t].loc;
    var marker = L.marker(loc, {
        /* draggable: true,   */   
        icon: throne_icon,
        title: 'Skelton Throne'  
        /* opacity: 0.5 */
    } 
    ).addTo(thronesLayer)
    .bindPopup(thrones[t].desc);
}


var toggleMarkers = function(theType, onoff) {
    var theLayer = getLayer(theType);
    if (onoff) {
        map.addLayer(theLayer);
    } else {
        map.removeLayer(theLayer);
    }
    
}

var getLayer = function(layerName) {
    for (var p=0; p<layerArray.length; p++) {
        if (layerArray[p][0] == layerName) {
            return layerArray[p][1];
        }
    }
}






function findNearestMarker(coords) {
    var minDist = 1000,
      nearest_text = '*None*',
      markerDist;


    for(var i in islands) {
        var title = islands[i].title;
        var loc = islands[i].loc;
        markerDist = map.distance(loc, coords);
      if (markerDist < minDist) {
        minDist = markerDist;
        nearest_text = title;
      }
    }
  
    //window.console('The nearest marker is: ' + nearest_text);
  }


var customOptions =
{
'maxWidth': '500',
'minWidth': '120',
'className' : 'context_popup'
};


var popup = L.popup(customOptions);

map.on('contextmenu', function(e) {
    var myLoc = e.latlng;
    popup
        .setLatLng(e.latlng)
        .setContent("<ul><li class='js-addMarker'>Add Marker</li><li class='js-closestOutpost'>Closest Pigs</li><li class='js-closestPigs'>Closest Pigs</li><li>Closest Snakes</li></ul>")
        .openOn(map);



    $(".js-addMarker").click(function() {
        console.log("Lat, Long: " + myLoc);
        L.marker(myLoc, {icon: xmarksspot, draggable: true}).addTo(map);
        map.closePopup();
    });

    $(".js-closestOutpost").click(function() {
        console.log("Lat, Long: " + myLoc);
        window.console.log("find nearest");
        //findNearestMarker(e.latlng);
    });

    // create popup contents
    /* var customPopup = "Mozilla Toronto Offices<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
    

    var marker = L.marker(e.latlng, {
        title: 'oen menu here'  
    } 
    ).bindPopup(customPopup,customOptions).addTo(map).popup(); */

});








//Graticule
var options = {interval: 5.85,
    showOriginLabel: false,
    redraw: 'move',
    zoomIntervals: [
     {start: 3, end: 6, interval: 5.85}
 ]};
L.simpleGraticule(options).addTo(map); 


map.on('zoomend', function() {
    adjustAlphaNum();
});

map.on('move', function() {
    adjustAlphaNum();
});

map.on('moveend', function() {
    adjustAlphaNum();
});

function adjustAlphaNum() {
    var currentZoom = map.getZoom()
    if (currentZoom >= 4) {
        $(".leaflet-grid-label").addClass("big");
    }
    //console.log(map.getZoom(), map.getCenter());
    //console.log(map.getBounds());
}


function modifyLoc(locArray, newLat, newLong) {
    var newLoc =[locArray[0]+ newLat, locArray[1]+ newLong];
    return newLoc;
}

















function tweakHeight() {
    var wH = $(window).height();
    $(".sotm_wrapper").css({"height" : wH + "px"});
    $("#mapid").css({"height" : wH + "px"});
}

var currentSearchIsland = -1;

$(function() {

    //This is a fix for the menubar dropping down?
    tweakHeight();
    $(window).resize(function() {
        tweakHeight();
    });
    $(window).on("load", function (e) {
        tweakHeight();
    });

    $(".js-searchforisland").click(function() {
        
        if ($(this).data("dir") == "left") {
            currentSearchIsland--;
            if (currentSearchIsland < 0) {
                currentSearchIsland = islands.length - 1;
            }
        } else {
            currentSearchIsland++;
            if (currentSearchIsland >= islands.length) {
                currentSearchIsland = 0;
            }
        }
        var LatLong = islands[currentSearchIsland].loc;
        map.setView(LatLong, 6);
        //map.panTo(LatLong, 6);
        
    });


    $(".js-toggleMarkers").click(function() {
        toggleMarkers($(this).attr("name"), $(this).is(":checked"));
    })
});









