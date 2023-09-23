let myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5, 
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data) {

  let radiusScale = d3.scaleQuantize()
  .domain([0, 6]) 
  .range([5, 10, 15, 20, 25, 30]);

    let markers = L.layerGroup();

    for (let i = 0; i < data.features.length; i++) {
  
      let location = data.features[i].geometry;
      if (location) {
        let mag = data.features[i].properties.mag;
        let depth = data.features[i].geometry.coordinates[2]; 
        
        let radius = radiusScale(mag);
  

        let circleMarker = L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            radius: radius,
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
          
        circleMarker.bindPopup(`<strong>Magnitude:</strong> ${data.features[i].properties.mag}
            <br><strong>Location:</strong> ${data.features[i].properties.place}<br><strong>Depth:</strong> ${depth}`);
          markers.addLayer(circleMarker);
        }
      }
  
      let legend = L.control({ position: 'bottomright' });

      legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
        <div class="legend-item">
           <div class="color-box" style="background-color: #2AF612;"></div>
           <div class="legend-label">-10-10</div>
        </div>
        <div class="legend-item">
           <div class="color-box" style="background-color: #CDF612;"></div>
           <div class="legend-label">10-30</div>
        </div>
        <div class="legend-item">
           <div class="color-box" style="background-color: #F6D312;"></div>
           <div class="legend-label">30-50</div>
        </div>
        <div class="legend-item">
           <div class="color-box" style="background-color: #F6B112;"></div>
           <div class="legend-label">50-70</div>
        </div>
        <div class="legend-item">
           <div class="color-box" style="background-color: #F18C84;"></div>
           <div class="legend-label">70-90</div>
        </div>
        <div class="legend-item">
           <div class="color-box" style="background-color: #F73906;"></div>
           <div class="legend-label">90+</div>
        </div>
        `;
      
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.border = '1px solid #ccc';
        div.style.fontFamily = 'Arial, sans-serif';
        div.style.fontSize = '12px';
      
        return div;
      };
      
      legend.addTo(myMap);
    myMap.addLayer(markers);
  
});



