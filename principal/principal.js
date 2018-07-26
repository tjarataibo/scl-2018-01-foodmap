//Funcionalidad de filtro
// var slider = document.getElementById('slider');

// noUiSlider.create(slider, {
// 	start: [20, 80],
// 	connect: true,
// 	range: {
// 		'min': 0,
// 		'max': 100
// 	}
// });

//Funcionalidad de barra de búsqueda
// $(document).ready(function(){
//     $('.nav-wrapper').nav-wrapper();
//   });

//Funcionalidad para modal
// var instance = M.Modal.getInstance(elem);

// $(document).ready(function(){
//     $('.modal').modal();
//   });

//Carrousel
$(document).ready(function(){
    $('.slider').slider();
  });
         

  var map;
  var infowindow;
  
  //CurrentPosition = ubicación 
  navigator.geolocation.getCurrentPosition(initMap);
  
  function initMap(position) {
      //latitud y longitud de geolocalización
      var lat = position.coords.latitude;
      var lng = position.coords.longitude
      //Obtener latitud y longitud de Santiago
      var santiago = {lat, lng};
    //Predeterminado
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
      
      var loCplace = place.geometry.location;
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
    
  