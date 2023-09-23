let myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4, 
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);



let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data) {
    // console.log(data.features);
    // console.log(data.features.length)

    let minDepth = 1000; 
    let maxDepth = -1000; 

for (let i = 0; i < data.features.length; i++) {
  let depth = data.features[i].geometry.coordinates[2];

  if (depth < minDepth) {
    minDepth = depth;
  }

  if (depth > maxDepth) {
    maxDepth = depth;
  }
}

console.log("Smallest Depth:", minDepth);
console.log("Largest Depth:", maxDepth);

// let colorScale = d3.scaleSequential(d3.interpolateHslLong("green", "red"))
//   .domain([minDepth, maxDepth])
//   .nice(6);

    // interpolateRdYlGn

  let radiusScale = d3.scaleQuantize()
  .domain([0, 6]) 
  .range([5, 10, 15, 20, 25, 30]);

    let markers = L.layerGroup();

    // Loop through the data.
    for (let i = 0; i < data.features.length; i++) {
  
      // Set the data location property to a variable.
      let location = data.features[i].geometry;
        // console.log(location);
      // Check for the location property.
      if (location) {
        let mag = data.features[i].properties.mag;
        let depth = data.features[i].geometry.coordinates[2]; 
        
        let radius = radiusScale(mag);
        // let color = colorScale(depth);
  
        // Add a new marker to the cluster group, and bind a popup.
        let circleMarker = L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            radius: radius,
            // fillColor: circleColor,
            fillOpacity: 0.6,
            color: 'black',
            weight: 1
          });

        if(depth >90){
            circleMarker.setStyle({fillColor: "#F73906"})
        }
        else if(depth >70){
            circleMarker.setStyle({fillColor: "#F18C84"})
        } 
        else if(depth >50){
            circleMarker.setStyle({fillColor: "#F6B112"})
        } 
        else if(depth >30){
            circleMarker.setStyle({fillColor: "#F6D312"})
        } 
        else if(depth >10){
            circleMarker.setStyle({fillColor: "#CDF612"})
        } 
        else{
            circleMarker.setStyle({fillColor: "#2AF612"})
        } 
          
          circleMarker.bindPopup(data.features[i].properties.title);
          markers.addLayer(circleMarker);
        }
      }
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);
  
});


//     createFeatures(data.features);

// });

// function createFeatures(earthquakeData) {
//     function onEachFeature(feature,layer){
//       layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }
//     let earthquakes = L.geoJSON(earthquakeData,{onEachFeature:onEachFeature});


//     createMap(earthquakes);
//   }

//   function createMap(earthquakes) {

//     let street = 
  
//     let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });
  
//     let baseMaps = {
//       "Street Map": street,
//       "Topographic Map": topo
//     };
  
//     let overlayMaps = {Earthquakes: earthquakes};

    



//     L.control.layers(baseMaps,overlayMaps, {
//         collapsed: false
//       }).addTo(myMap);
