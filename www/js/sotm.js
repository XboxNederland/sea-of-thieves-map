!function(t){var o={};function e(l){if(o[l])return o[l].exports;var i=o[l]={i:l,l:!1,exports:{}};return t[l].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=o,e.d=function(t,o,l){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:l})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},e.p="",e(e.s=0)}([function(t,o,e){t.exports=e(1)},function(t,o){var e=L.map("mapid",{maxZoom:6,minZoom:2,crs:L.CRS.Simple,attributionControl:!1,preferCanvas:!1}).setView([70,70],4),l=new L.LatLngBounds(e.unproject([0,10462],6),e.unproject([10462,0],6));e.fitBounds(l),layer=L.tileLayer("images/tiles/{z}/{x}/{y}.png",{minZoom:2,maxZoom:6,bounds:l,noWrap:!0,tms:!1}).addTo(e),e.setMaxBounds(l),e.on("click",function(t){console.log("You clicked the map at "+t.latlng)});var r=new L.LayerGroup;e.addLayer(r);var a=new L.Control.Search({position:"topright",layer:r,initial:!1,zoom:4,marker:!1});e.addControl(a);var n=[{loc:[-39.625,60.1],title:"Lone Cove",radius:4},{loc:[-67.53125,48.125],title:"Cannon Cove",radius:4},{loc:[-65.09375,62.84375],title:"Rum Runner Isle",radius:2},{loc:[-78.422607,118.649658],title:"The Crooked Masts",radius:3},{loc:[-25.71875,15.59375],title:"Sailor's Bounty",radius:4},{loc:[-18.227905,40.417725],title:"Smugglers' Bay",radius:4},{loc:[-20.850708,54.960571],title:"Salty Sands",radius:2},{loc:[-25.875,66.875],title:"Picaroon Palms",radius:2},{loc:[-24.90625,85.8125],title:"Scurvy Isley",radius:2},{loc:[-25.786011,104.275391],title:"Old Faithful Isle",radius:4},{loc:[-20.0625,118.4375],title:"Black Sand Atoll",radius:2},{loc:[-18.634888,133.902466],title:"Marauder's Arch",radius:4},{loc:[-30.094604,30.657227],title:"Sandy Shallows",radius:2},{loc:[-30.9375,47.96875],title:"Boulder Cay",radius:2},{loc:[-42.625,21.96875],title:"Keel Haul Fort",radius:2},{loc:[-45.8125,41.28125],title:"Sanctuary Outpost",radius:4},{loc:[-53.90625,55],title:"Lonely Isle",radius:2},{loc:[-53.125,69.25],title:"Hidden Spring Keep",radius:3},{loc:[-38.733154,112.010498],title:"Blind Man's Lagoon",radius:2},{loc:[-32.576904,123.666748],title:"Shark Fin Camp",radius:2},{loc:[-39.858154,134.197998],title:"Plunderer's Plight",radius:2},{loc:[-31.59375,141.65625],title:"Black Water Enclave",radius:2},{loc:[-38.125,90.5625],title:"Kraken's Watchtower",radius:2},{loc:[-51.208862,103.17157],title:"Dagger Tooth Outpost",radius:4}];for(i in n){var s=n[i].title,u=L.circle(n[i].loc,{strokeweight:1,opacity:0,color:"#fff",fillColor:"#fff",fillOpacity:0,radius:n[i].radius,className:"customclass",title:s}).bindPopup(s);r.addLayer(u)}L.simpleGraticule({interval:5.85,showOriginLabel:!1,redraw:"move",zoomIntervals:[{start:3,end:6,interval:5.85}]}).addTo(e),e.on("zoomend",function(){}),e.on("move",function(){})}]);
//# sourceMappingURL=maps/sotm.js.map