var map = L.map('map').setView([47.2529, -122.4443], 11.5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamthbmcxIiwiYSI6ImNrZ3d5NjR3NDBldzgycW8zdDZ0NTZvYjAifQ.lUQQ9nNNJryYS05ye4FpLA'
}).addTo(map);


var drawnItems = L.featureGroup().addTo(map);
var cartoData = L.layerGroup().addTo(map);
var url = "https://jkang11.carto.com/api/v2/sql";
var urlGeoJSON = url + "?format=GeoJSON&q=";
var sqlQuery = "SELECT the_geom, description, name, opinion FROM lab_3b_jemin";
function addPopup(feature, layer) {
    layer.bindPopup(
        "<b>" + feature.properties.name + "</b><br>" +
        feature.properties.description + "<br>" +
        feature.properties.opinion
    );
}

fetch(urlGeoJSON + sqlQuery)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        L.geoJSON(data, {onEachFeature: addPopup}).addTo(cartoData);
    });

new L.Control.Draw({
    draw : {
        polygon : true,
        polyline : false,      // line disabled
        rectangle : false,     // Rectangles disabled
        circle : false,        // Circles disabled
        circlemarker : false,  // Circle markers disabled
        marker: true
    },
    edit : {
        featureGroup: drawnItems
    }
}).addTo(map);
map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    drawnItems.eachLayer(function(layer) {
        var geojson = JSON.stringify(layer.toGeoJSON().geometry);
        console.log(geojson);
    });
});

function createFormPopup() {
    var popupContent =
        '<form>' +
        'Name of the place:<br><input type="text" id="input_name" value="ex: Best Italian Dining"><br>' +
        'Description:<br><input type="text" id="input_desc" value="ex: A nice italian dining experience"><br>' +
        'Personal Opinion:<br><input type="text" id="input_opinion" value="ex: I loved it"><br>' +
        '<input type="button" value="Submit" id="submit">' +
        '</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}

map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
});

function setData(e) {

    if(e.target && e.target.id == "submit") {

        // Get user name and description
        var enteredUsername = document.getElementById("input_name").value;
        var enteredDescription = document.getElementById("input_desc").value;
        var enteredPersonal = document.getElementById("input_opinion").value;
        // For each drawn layer
        drawnItems.eachLayer(function(layer) {

    			// Create SQL expression to insert layer
                var drawing = JSON.stringify(layer.toGeoJSON().geometry);
                var sql =
                    "INSERT INTO lab_3b_jemin (the_geom, name, opinion, description) " +
                    "VALUES (ST_SetSRID(ST_GeomFromGeoJSON('" +
                    drawing + "'), 4326), '" +
                    enteredUsername + "', '" +
                    enteredPersonal + "', '" +
                    enteredDescription + "')";
                console.log(sql);

                // Send the data
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "q=" + encodeURI(sql)
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("Data saved:", data);
                })
                .catch(function(error) {
                    console.log("Problem saving the data:", error);
                });

            // Transfer submitted drawing to the CARTO layer
            //so it persists on the map without you having to refresh the page
            var newData = layer.toGeoJSON();
            newData.properties.description = enteredDescription;
            newData.properties.name = enteredUsername;
            newData.properties.opinion = enteredPersonal;
            L.geoJSON(newData, {onEachFeature: addPopup}).addTo(cartoData);

        });

        // Clear drawn items layer
        drawnItems.closePopup();
        drawnItems.clearLayers();

    };
};
document.addEventListener("click", setData);

map.addEventListener("draw:editstart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:deletestart", function(e) {
    drawnItems.closePopup();
});
map.addEventListener("draw:editstop", function(e) {
    drawnItems.openPopup();
});
map.addEventListener("draw:deletestop", function(e) {
    if(drawnItems.getLayers().length > 0) {
        drawnItems.openPopup();
    }
});

window.onload = function(){
                alert("IMPORTANT!!! It will never share your information with third party.");
                }
