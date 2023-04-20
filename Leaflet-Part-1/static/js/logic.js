	// Creating the map object
  var myMap = L.map("map", {
    center: [47.116386, -101.299591],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  
  function chooseColor (depth) {
        
    // Conditionals for depth
    if (depth >= -10 && depth < 10) return "#f0b6cc";
    else if (depth >= 10 && depth < 30) return "#f984e5";
    else if (depth >= 30 && depth < 50) return "#c477c9";
    else if (depth >= 50 && depth < 70) return "#c71585";
    else if (depth >= 70 && depth < 90) return "#7c538c";
    else return "#1e212d";
    }

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
 

  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
  
    pointToLayer : function(feature, latlng) {
      return L.circleMarker(latlng, {
      fillOpacity: 0.75,
      color: chooseColor(feature.geometry.coordinates[2]),
      fillColor: chooseColor(feature.geometry.coordinates[2]),
      opacity: 1,
      radius: feature.properties.mag*5
      }).bindPopup("<h1>" + feature.properties.title + "</h1> <hr> <h2> Depth: " + feature.geometry.coordinates[2] + "</h2>")
  
    }
  }).addTo(myMap)
  
  // Set up the legend
  var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      scales = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]
      colors = ["#f0b6cc", "#f984e5", "#c477c9", "#c71585", "#7c538c", "#1e212d"]
      labels = [];

      var legendInfo = 
      "<div class=\"labels\">" +
      "</div>";
 
      div.innerHTML = legendInfo;
      scales.forEach(function(scale,index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>" + scale);
    });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
    legend.addTo(myMap);
  });


  