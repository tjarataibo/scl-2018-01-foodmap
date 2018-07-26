// // Create a script tag and set the USGS URL as the source.
// var script = document.createElement('script');

// script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
// document.getElementsByTagName('head')[0].appendChild(script);

//Funcionalidad mapa

service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);


var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.4190456,-70.64176040000001);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['restaurant']
  };

//Llamadas por lugares cercanos
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

//Llamadas por búsquedas de texto
service = new google.maps.places.PlacesService(map);
service.textSearch(request, callback);


//Solicitudes de detalles por lugar
service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);

var request = {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
  };
  
  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);
  
  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarker(place);
    }
  }