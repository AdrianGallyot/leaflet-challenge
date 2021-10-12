// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(mag) {
  return mag*25000;
}

// Each city object contains the city's name, location and population
// var cities = [
//   {
//     name: "Sydney",
//     location: [-33.8688, 151.2093],
//     population: 5312000
//   },
//   {
//     name: "Melbourne",
//     location: [-37.8136, 144.9631],
//     population: 5078000
//   },
//   {
//     name: "Brisbane",
//     location: [-27.4705, 153.0260],
//     population: 2280000
//   },
//   {
//     location: [-31.95, 115.86],
//     name: "Perth",
//     population: 2083645
//   },
//   {
//     name: "Adelaide",
//     location: [-34.9285, 138.6007],
//     population: 1306000
//   }
// ];

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(response) {
  // Once we get a response, send the data.features object to the createFeatures function
  // Loop through the cities array and create one marker for each city object
  var range = [];

  for (var i = 0; i < response.features.length; i++) {

    console.log(response.features[i].geometry.coordinates);
    var location = response.features[i].geometry.coordinates;


    if(typeof location === 'undefined'){
      // element does not exist
    }

    else {
      if(typeof location[0] === 'undefined'){
        console.log(location[0])
      }
      if(typeof location[1] === 'undefined'){
        console.log(location[1])
      }
      if(location[0] != null && location[1] != null && location.length == 3){
        range.push([location[1], location[0]]);
      }
      // if(location[0] != null && location[1] != null && location.length == 3 && magni >= 2){
      //   midrange.push([location[1], location[0]]);
      // }
      // if(location[0] != null && location[1] != null && location.length == 3 && magni > 5){
      //   highrange.push([location[1], location[0]]);
      // }
    }

    // Variable to Store Magnitude of each Earthquake
    var magni = response.features[i].properties.mag;
    console.log(response.features[i].properties.mag);

    // Variable to store the Fill colour for each earthquake depending on Magnitude.

    var fill = "";

    if(magni <= 2) {
      console.log("Lowrange: "+ magni);
      fill = "green";
    }
    else {
      if(magni > 2 && magni <=6) {
        console.log("Midrange: "+ magni);
        fill = "orange";
      }
      if(magni >= 6) {
        console.log("Highrange: "+ magni);
        fill = "red";
      }
    }

    console.log(fill);

    console.log(range[i]);

    L.circle(range[i], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: fill,
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(response.features[i].properties.mag)
    }).bindPopup("<h3> Location: </br>" + response.features[i].properties.place +" </br> Magnitude: "+ response.features[i].properties.mag +
    " </br> Time:"+ new Date(response.features[i].properties.time) +"</h3>").addTo(myMap);

    // L.circle(midrange[i], {
    //   fillOpacity: 0.75,
    //   color: "white",
    //   fillColor: "blue",
    //   // Setting our circle's radius equal to the output of our markerSize function
    //   // This will make our marker's size proportionate to its population
    //   radius: markerSize(response.features[i].properties.mag)
    // }).bindPopup("<h3> Location: </br>" + response.features[i].properties.place +" </br> Magnitude:"+ response.features[i].properties.mag +
    // " </br> Time:"+ new Date(response.features[i].properties.time) +"</h3>").addTo(myMap);

    // L.circle(highrange[i], {
    //   fillOpacity: 0.75,
    //   color: "white",
    //   fillColor: "blue",
    //   // Setting our circle's radius equal to the output of our markerSize function
    //   // This will make our marker's size proportionate to its population
    //   radius: markerSize(response.features[i].properties.mag)
    // }).bindPopup("<h3> Location: </br>" + response.features[i].properties.place +" </br> Magnitude:"+ response.features[i].properties.mag +
    // " </br> Time:"+ new Date(response.features[i].properties.time) +"</h3>").addTo(myMap);

  }
  
});

// Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(cities[i].population)
//   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
// }
