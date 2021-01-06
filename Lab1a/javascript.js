
var map = L.map('map').fitWorld();

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamthbmcxIiwiYSI6ImNrZ3d5NjR3NDBldzgycW8zdDZ0NTZvYjAifQ.lUQQ9nNNJryYS05ye4FpLA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    function onLocationFound(e) {
        var radius = e.accuracy; //this defines a variable radius as the accuracy value returned by the locate method. The unit is meters.

        L.marker(e.latlng).addTo(map)  //this adds a marker at the lat and long returned by the locate function.
            .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet of this point").openPopup(); //this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number.

        L.circle(e.latlng, radius).addTo(map); //this adds a circle to the map centered at the lat and long returned by the locate function. Its radius is set to the var radius defined above.
    }
    map.on('locationfound', onLocationFound); //this is the event listener

    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});
