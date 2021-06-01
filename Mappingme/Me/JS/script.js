
//copy your access token here
      mapboxgl.accessToken = 'pk.eyJ1IjoiamthbmcxIiwiYSI6ImNrZ3d5NjR3NDBldzgycW8zdDZ0NTZvYjAifQ.lUQQ9nNNJryYS05ye4FpLA';

          var map = new mapboxgl.Map({
          container: 'map', // HTML container id
          style:  'mapbox://styles/jkang1/ckifbxk034gpa19n3v9ks1qni', // style URL
          center: [-122.4523209, 47.2427187],// starting position as [lng, lat]
          zoom: 10.5 // starting zoom
          });

//Hover Effect

          var hoveredStateId =  null;
            map.on('load', function () {
            map.addSource("Tacoma", {
            "type": "geojson",
            "data": "Geojson/Tacoma_Un.json",
            'promoteId':'OBJECTID'
            });

// The feature-state dependent fill-opacity expression will render the hover effect
// when a feature's hover state is set to true.
            map.addLayer({
            "id": "fills",
            "type": "fill",
            "source": "Tacoma",
            "layout": {},
            "paint": {
            "fill-color": "White",
            "fill-opacity": ["case",
            ["boolean", ["feature-state", "hover"], false],
            0.8,
            0.0
            ]
            }
            });

            map.addLayer({
            "id": "state-borders",
            "type": "line",
            "source": "Tacoma",
            "layout": {},
            "paint": {
            "line-color": "#627BC1",
            "line-width": 1.3
            }
            });

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
            map.on("mousemove", "fills", function(e) {
            if (e.features.length > 0) {
            if (hoveredStateId) {
            map.setFeatureState({source: 'Tacoma', id: hoveredStateId}, { hover: false});
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState({source: 'Tacoma', id: hoveredStateId}, { hover: true});
            }
            });

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
            map.on("mouseleave", "fills", function() {
            if (hoveredStateId) {
            map.setFeatureState({source: 'Tacoma', id: hoveredStateId}, { hover: false});
            }
            hoveredStateId =  null;
            });
            });

//popup
            map.on('click', 'fills', function (e) {
            new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("Total Population: " + "<b>" + e.features[0].properties.Population + '</b>' + '<br>' + "Population per Sqaure Mile: " + "<b>" + e.features[0].properties.Density)
            .addTo(map);
            });


//legend
            map.on('load', function() {
            var layers = ['Lowest | 0-5000', 'Low | 5000-10000', 'medium | 10000-15000',  'High | 15000-20000', 'Highest | 20000-25000'];
            var colors = ['#42fc31', '#d5fb4b', '#fded3a', '#fca22c', '#c70000'];
            for (i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var color = colors[i];
            var item = document.createElement('div');
            var key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
            var value = document.createElement('span');
            value.innerHTML = layer;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
            }
            });

//Fly to location
            map.on('click', function (e) {
            map.flyTo({
            center: e.lngLat,
            zoom:13
            });
            });

//Geocoder
            map.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
            );
//Full screen
            map.addControl(new mapboxgl.FullscreenControl()
            );

//locate User
            map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            })
            );
