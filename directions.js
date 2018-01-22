

var directionsDisplay; 
var infoWindow; 
var directionsService; 
var pos;
var des; 
var shortestLocation;
var locations = [ 
  {lat: 33.778766, lng: -84.295133},
  {lat: 33.784875, lng: -84.421843},
  {lat: 33.794354, lng: -84.387332},
  {lat: 33.839081, lng: -84.377681},
  {lat: 33.772857, lng: -84.366450},
  {lat: 33.781283, lng: -84.413623}
]
 

function initMap() {
 directionsDisplay = new google.maps.DirectionsRenderer;
 infoWindow = new google.maps.InfoWindow;
 directionsService = new google.maps.DirectionsService;

  //des = {lat: 33.7577, lng:  -84.4008};
  
 // alert('hi');
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
     pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(pos)


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: position.coords.latitude, lng: position.coords.longitude}
    });
    addMarkers(locations, map, pos, directionsService, directionsDisplay)
    directionsDisplay.setMap(map);



    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);

  }, function() {
    let p = {lat: 33.7577, lng:  -84.4008}
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: p.lat, lng: p.lng}
    });
    addMarkers(locations, map, p, directionsService, directionsDisplay)
    directionsDisplay.setMap(map);



    infoWindow.setPosition(p);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(p);
    //handleLocationError(true, infoWindow, map.getCenter());
  });
  } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

      }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, pos, des, waypoints) {
  //var selectedMode = document.getElementById('mode').value;
  var selectedMode = "BICYCLING";
  console.log(pos, des)
  directionsService.route({
    origin: {lat: pos.lat, lng: pos.lng},  // Haight.
    destination: {lat: des.lat, lng: des.lng},  // Ocean Beach.
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    waypoints: waypoints,

    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


function addMarkers(locations, map, pos, directionsService, directionsDisplay) {

  var shortest = 999999;
  shortestLocation;
  locations.forEach(function (location, i){
    console.log(location, i);
    var distance = Number(calcDistance(pos, location))
    console.log(distance)
    if (distance < shortest) {
      shortest = distance
      shortestLocation = location
    } 
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Hello World!'
    });

  });            
  console.log('shortest', shortest, shortestLocation)
  let waypoints=[ ]
  calculateAndDisplayRoute(directionsService, directionsDisplay, pos, shortestLocation, waypoints)
}


//calculates distance between two points in km's
function calcDistance(pos, loc) {
  var p1 = new google.maps.LatLng(pos.lat, pos.lng);
  var p2 = new google.maps.LatLng(loc.lat, loc.lng);
  console.log((google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2))
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2)
}

$(document).ready(function() {
  $('#search').click(function() {
   let searchTerm = $('#search-input').val()
   var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': searchTerm }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
            let newpos = { 'lat': results[0].geometry.location.lat() ,'lng': results[0].geometry.location.lng()}
            var shortest = 999999;
            shortestLocation;
            locations.forEach(function (location, i){
             console.log(location, i);
             var distance = Number(calcDistance(newpos, location))
             console.log(distance)
             if (distance < shortest) {
              shortest = distance
              shortestLocation = location
            } 
          });            
            console.log('shortest', shortest, shortestLocation)

            let waypoints=[{
              location: searchTerm, 
              stopover: true
            } ]
            calculateAndDisplayRoute(directionsService, directionsDisplay, pos, shortestLocation, waypoints)






          } else {
            console.log("Something got wrong " + status);
          }
        });
   })
   
});
