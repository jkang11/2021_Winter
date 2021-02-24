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
var sqlQuery = "SELECT the_geom, name, address, hours, phone, heated, covered FROM lab_3c_jemin";
function addPopup(feature, layer) {
    layer.bindPopup(
        "<b>" + feature.properties.name + "</b><br>" +
        feature.properties.address + "<br>" +
        feature.properties.hours + "<br>" +
        feature.properties.phone + "<br>" +
        feature.properties.heated + "<br>" +
        feature.properties.covered
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
        '<strong>Name</strong>:<br><input type="text" id="input_name"><br>' +
        '<strong>Address</strong>:<br><input type="text" id="input_address"><br>' +
        '<strong>Hours</strong>:<br><input type="text" id="input_hours"><br>' +
        '<strong>Phone</strong>:<br><input type="tel" id="input_tel" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required><br>' +
        '<strong>Heated?</strong>:<br><input type="checkbox" id="input_heated"><br>' +
        '<strong>Covered?</strong>:<br><input type="checkbox" id="input_covered"><br>' +
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
        var enteredname = document.getElementById("input_name").value;
        var enteredaddress = document.getElementById("input_address").value;
        var enteredhours = document.getElementById("input_hours").value;
        var enteredphone = document.getElementById("input_tel").value;
        var enteredheated = document.getElementById("input_heated").value;
        var enteredcovered = document.getElementById("input_covered").value;
        // For each drawn layer
        drawnItems.eachLayer(function(layer) {

    			// Create SQL expression to insert layer
                var drawing = JSON.stringify(layer.toGeoJSON().geometry);
                var sql =
                    "INSERT INTO lab_3c_jemin (the_geom, name, address, hours, phone, heated, covered) " +
                    "VALUES (ST_SetSRID(ST_GeomFromGeoJSON('" +
                    drawing + "'), 4326), '" +
                    enteredname + "', '" +
                    enteredaddress + "', '" +
                    enteredhours + "', '" +
                    enteredphone + "', '" +
                    enteredheated + "', '" +
                    enteredcovered + "')";
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
            newData.properties.name = enteredname;
            newData.properties.address = enteredaddress;
            newData.properties.hours = enteredhours;
            newData.properties.phone = enteredphone;
            newData.properties.heated = enteredheated;
            newData.properties.covered = enteredcovered;
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
                alert("IMPORTANT!!! Please scroll down to read about this map.");
                }
