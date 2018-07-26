
// var map;

// function initMap() {
//   // Create the map.
//   var pyrmont = {lat: -33.4569400, lng: -70.6482700};
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: pyrmont,
//     zoom: 17
//   });

//   // Create the places service.
//   var service = new google.maps.places.PlacesService(map);
//   var getNextPage = null;
//   var moreButton = document.getElementById('more');
//   moreButton.onclick = function() {
//     moreButton.disabled = true;
//     if (getNextPage) getNextPage();
//   };

//   // Perform a nearby search.
//   service.nearbySearch(
//       {location: santiago, radius: 500, type: ['restaurant']},
//       function(results, status, pagination) {
//         if (status !== 'OK') return;

//         createMarkers(results);
//         moreButton.disabled = !pagination.hasNextPage;
//         getNextPage = pagination.hasNextPage && function() {
//           pagination.nextPage();
//         };
//       });
// }

// function createMarkers(places) {
//   var bounds = new google.maps.LatLngBounds();
//   var placesList = document.getElementById('places');

//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });

//     var li = document.createElement('li');
//     li.textContent = place.name;
//     placesList.appendChild(li);

//     bounds.extend(place.geometry.location);
//   }
//   map.fitBounds(bounds);
// }


// API KEY: AIzaSyDASoquoCpXyYppGev41cMSX3DZJLrCzoM

var map;
var infowindow;

//CurrentPosition = ubicación 
navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    //latitud y longitud de geolocalización
    var lat = position.coords.latitude;
    var lng = position.coords.longitude
    var santiago = {lat, lng};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng},
    zoom: 15
  });
  
  infowindow = new google.maps.InfoWindow();
   //Variable de PlaceService y enviamos la petición
   var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    //Rango de lugar, hasta dónde muestra restaurantes
    location: santiago,
    radius: 1000,
    //Búsqueda de restaurant
    type: ['restaurant']
  }, callback);


  function callback(results, status) {
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]); 
        console.log(results);
      }

    }
  }

  //Para añadir marcador
  function createMarker(place) {
    
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    //Click del marcador
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      
      infowindow.open(map, this);
     
    });
  }
    
  }
  
