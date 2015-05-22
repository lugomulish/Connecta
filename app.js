var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var map;

//Creamos la ubicacion del df con sus cordenadas.
var df = new google.maps.LatLng(19.4331716,-99.1266943);

//Creamos el mapa principal de googleMaps, le pasamos la ubicacion del DF.
function initialize() {
  var mapOptions = {
    zoom: 7,
    center: df
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

  calcRoute();
}

function calcRoute() {  
  //Creamos 2 ubicaciones estaticas, Bellas Artes y la basilica de guadalupe
  var bellasArtes = new google.maps.LatLng(19.4352,-99.1412);
  var basilicaGuadalupe = new google.maps.LatLng(19.484857,-99.117862);

  //Creamos el objeto Request, que se enviara con el directionsService
  //en el cual se indica el origen, destino y metodo de viaje con el 
  //que se trazara la ruta.
  
  var request = {    
    origin: basilicaGuadalupe,
    destination: bellasArtes,
    // waypoints:[{location: 'Bourke, NSW'}, {location: 'Broken Hill, NSW'}],          
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.0;
  document.getElementById('total').innerHTML = total + ' km';
}

google.maps.event.addDomListener(window, 'load', initialize);