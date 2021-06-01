//copy your access token here
      mapboxgl.accessToken = 'pk.eyJ1IjoiamthbmcxIiwiYSI6ImNrZ3d5NjR3NDBldzgycW8zdDZ0NTZvYjAifQ.lUQQ9nNNJryYS05ye4FpLA';

          var map2 = new mapboxgl.Map({
          container: 'map2',// HTML container id
          style:  'mapbox://styles/jkang1/ckicrqxxi1zli19n2sdwxazjb',// style URL
          center: [-122.4548726, 47.2445451],// starting position as [lng, lat]
          zoom: 10.5 // starting zoom
          });

//Tacoma boundary
          map2.on('load', function(){
          map2.addSource('Population', {
          "type": "geojson",
          "data": "Geojson/Tacoma.geojson"
          });
          map2.addLayer({
          "id":"Population_total",
          "type":"fill",
          "source":"Population",
          "paint": {
          "fill-color": "grey",
          "fill-opacity": 0.5
          }
          });

          });

//coffee shops

          var geojson ={"type":"FeatureCollection", "features": [
          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4826669, 47.1742255]},"properties":{"OBJECTID":10,"NAME":"Coffee Kitchen","ADDRESS":"9115 S Tacoma Way","CITY":"TACOMA","ZIP":"98499","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
          '<p>Coffee Kitchen is one of my favorite coffee shops in Tacoma/Lakewood. They offer variety of beverage and food and the staffs are always friendly.</p>',"TYPE":"TECHNICAL","PHONE":"2535884191","WEBSITE":"https://batestech.edu/","PRS_ID":342,"GRADE":"Higher Education","X_COORD":1151634.216,"Y_COORD":702078.521}},
          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4497339, 47.2635181]},"properties":{"OBJECTID":273,"NAME":"Anthem Coffee","ADDRESS":"102 N G Street","CITY":"TACOMA","ZIP":"98499","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
          '<p>Anthem Coffee is located in several places in Tacoma. I used to go to the one across the UWT campus, but I have been going to  this location recently. Their americano is so good!</p>',"TYPE":"UNIVERSITY","PHONE":"(253) 879-3100","WEBSITE":"https://www.pugetsound.edu/","PRS_ID":252,"GRADE":"Higher Education","X_COORD":1148566.373,"Y_COORD":709469.9368}},
          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4834339, 47.1799051 ]},"properties":{"OBJECTID":273,"NAME":"T-Town Café","ADDRESS":"8515 S Tacaoma Way","CITY":"TACOMA","ZIP":"98499","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
          '<p>T-Town is probably my second go-to coffee shop in Tacoma. Their fish-shaped icecream is one my favorite desserts!</p>',"TYPE":"UNIVERSITY","PHONE":"(253) 879-3100","WEBSITE":"https://www.pugetsound.edu/","PRS_ID":252,"GRADE":"Higher Education","X_COORD":1148566.373,"Y_COORD":709469.9368}},
          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4405366,47.2470727]},"properties":{"OBJECTID":274,"NAME":"Campfire Coffee Co.","ADDRESS":"1554 Market street","CITY":"TACOMA","ZIP":"98402","DISTRICT":"NOT APPLICABLE","DIST_NO":"",'description':
          '<p>Although I have been here only few times, I love this place. I think they provide the best coffee in town.</p>', "TYPE":"UNIVERSITY","PHONE":"(253) 692-4400","WEBSITE":"http://www.tacoma.uw.edu/","PRS_ID":243,"GRADE":"Higher Education","X_COORD":1159036.5583,"Y_COORD":703074.0025}}
          ]};
// add markers to map
      geojson.features.forEach(function(marker) {
// create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker';

// make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup()
          .setHTML("Name: " + "<b>" + marker.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker.properties['ADDRESS']  + "<b>" + marker.properties['description']))
          .addTo(map2);
          });

//Grocery
          var geojson ={"type":"FeatureCollection", "features": [

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.485149, 47.1784148]},"properties":{"OBJECTID":261,"NAME":"H-Mart","ADDRESS":"8720 S Tacoma Way","CITY":"TACOMA", 'description':
          '<p><a href="https://www.hmartus.com/" target="_blank" title="Opens in a new window">H-Mart</a> is my favorite Korean grocery store. The store is clean and safe, and they offer all kinds of Korean products at a compeitive price.</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4824475,47.1691495]},"properties":{"OBJECTID":261,"NAME":"Paldo World Market","ADDRESS":"9701 S Tacoma Way","CITY":"TACOMA", 'description':
          '<p>This is my go-to grocery store for meat. They have a high quality pork and beef especially for barbecue!</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5381954, 47.223093]},"properties":{"OBJECTID":273,"NAME":"Trader Joe's","ADDRESS":"3800 Bridgeport Way W ","CITY":"TACOMA", 'description':
          '<p><a href="https://locations.traderjoes.com/wa/university-place/148/?utm_source=gmb&utm_medium=organic&utm_campaign=local" target="_blank" title="Opens in a new window">Trader Joes</a> is where I go to buy fruits and Japanese sweet potatoes. As you all probably know, they offer a high quality fruits and vegetables. Also, so many frozen food!</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5293975, 47.2005144]},"properties":{"OBJECTID":273,"NAME":"Fred Meyer","ADDRESS":"6305 Bridgeport Way W","CITY":"TACOMA", 'description':
          '<p><a href="https://www.fredmeyer.com/stores/details/701/00615?cid=loc_70100615_gmb" target="_blank" title="Opens in a new window">Fred Meyer</a> is my go-to grocery store. This is where I go for most of my grocery shopping and sometimes to get a small appliance, too.</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4681604, 47.2252846]},"properties":{"OBJECTID":274,"NAME":"Costco","ADDRESS":"2219 S 37th St.","CITY":"TACOMA", 'description':
          '<p><a href="http://www.costco.com/warehouse-locations/tacoma-WA-95.html?utm_term=KW&utm_campaign=Homepage&utm_medium=GMB&utm_source=Google&utm_content=Link" target="_blank" title="Opens in a new window">Costco</a> is where I go for buying eggs, yogurts, and vitamins. I joined its membership right after I arrived Tacoma!</p>'}}
          ]};

// add markers to map
      geojson.features.forEach(function(marker2) {

// create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker2';

// make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(marker2.geometry.coordinates)
          .setPopup(new mapboxgl.Popup()
          .setHTML("Name: " + "<b>" + marker2.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker2.properties['ADDRESS'] + "<b>" + marker2.properties['description']))
          .addTo(map2);
          });

//Place I want to visit
          var geojson ={"type":"FeatureCollection", "features": [

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5280797, 47.309607]},"properties":{"OBJECTID":261,"NAME":"Point Defiance Park","ADDRESS":"5400 N Pearl Street","CITY":"TACOMA", 'description':
          '<p><a href="https://www.metroparkstacoma.org/place/point-defiance-park/" target="_blank" title="Opens in a new window">Point Defiance Park</a> is a large urban park including Point Defiance Zoo & Aquarium, the Rose Garden, Rhododendron Garden, beaches, and more. What a great place for a date! I have not had chances to visit here, but I am planning to visit soon!</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4484598, 47.2643224 ]},"properties":{"OBJECTID":261,"NAME":"Salamone’s Pizza","ADDRESS":"24 N Tacoma Ave","CITY":"TACOMA", 'description':
          '<p><a href="http://www.salamonespizzeria.com/" target="_blank" title="Opens in a new window">This place</a> is recommended by Ryan! He said they have a solid NY style pizza which I really want to try. I will have to make a trip to this place very soon!</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.5032953, 47.2981275]},"properties":{"OBJECTID":261,"NAME":"Point Ruston","ADDRESS":"5020 Main Street","CITY":"TACOMA", 'description':
          '<p><a href="http://www.pointruston.com/" target="_blank" title="Opens in a new window">Point Ruston</a> is where I want to visit on a sunny day. I have been here for probably twice, but did not get to look around. But it seems like a great spot for a date!</p>'}},

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.569706, 47.2128783]},"properties":{"OBJECTID":273,"NAME":"Chambers Bay Park","ADDRESS":"4800-4850 Grandview Dr W","CITY":"TACOMA", 'description':'<p><a href="https://www.piercecountywa.gov/1317/Chambers-Creek-Regional-Park" target="_blank" title="Opens in a new window">Chambers Bay Park</a> is only about 10 mins from my home, but I have not been here! I heard this place is really good for a picnic, so I will have to visit here when the weather is nice.</p>'}},
          ]};

// add markers to map
      geojson.features.forEach(function(marker3) {

// create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker3';

// make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(marker3.geometry.coordinates)
          .setPopup(new mapboxgl.Popup()
          .setHTML("Name: " + "<b>" + marker3.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker3.properties['ADDRESS'] + "<b>" + marker3.properties['description']))
          .addTo(map2);
          });

//Other Places to visit
          var geojson ={"type":"FeatureCollection", "features": [

          {"type":"Feature","geometry":{"type":"Point","coordinates":[-122.4782806, 47.2159539 ]},"properties":{"OBJECTID":261,"NAME":"Alder Court Apartment","ADDRESS":"N/A","CITY":"TACOMA", 'description':
          '<p>This is where I currently live!</p>'}},


          {"type":"Feature","geometry":{"type":"Point","coordinates":[127.1342547, 37.5446945]},"properties":{"OBJECTID":273,"NAME":"Home in Korea","ADDRESS":"서울시 강동구 천호동 구천면로 278","CITY":"TACOMA", 'description':
          '<p>This is where my family live in Korea and where I used to live!</p>'}},

          ]};

// add markers to map
      geojson.features.forEach(function(marker4) {

// create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker4';

// make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(marker4.geometry.coordinates)
          .setPopup(new mapboxgl.Popup()
          .setHTML("Name: " + "<b>" + marker4.properties['NAME'] + '</b>' + "<br>" + "Address: " + "<b>" + marker4.properties['ADDRESS'] + "<b>" + marker4.properties['description']))
          .addTo(map2);
          });

//Geocoder
          map2.addControl(
          new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl
          })
          );

//Zoom
          map2.addControl(new mapboxgl.NavigationControl());

//Fly to location
          map2.on('click', function (e) {
          map2.flyTo({
          center: e.lngLat,
          zoom:13
          });
          });

// Direction
          map2.addControl(
          new MapboxDirections({
          accessToken: mapboxgl.accessToken
          }),
          'top-left'
          );

//Full screen
          map2.addControl(new mapboxgl.FullscreenControl());
