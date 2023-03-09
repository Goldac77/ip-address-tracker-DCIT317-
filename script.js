const btn = document.querySelector("#form-btn");
const ipInput = document.querySelector("#inputBtn");
const intialLocation = [5.652426305999822, -0.1880851446149894]; //UGCS location


btn.addEventListener("click", () => {
    fetch(`http://ipinfo.io/${ipInput.value}?token=54737db2987f24`)
    .then(response => response.json())
    .then(data => {
        //get the latitude and longitude...
        let location = data.loc.split(",");
        let lat = location[0];
        let long = location[1];

        //fly to new location
        map.flyTo([lat, long], 13);

        //remove initial marker
        map.removeLayer(initialMarker);

        //new marker
        let newMarker = new L.Marker([lat, long]);
        newMarker.addTo(map);
        newMarker.bindPopup(`${data.org}`);

    })
})

//Initial map render location is UGCS
var map = L.map('map').setView(intialLocation, 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
//marker marker to map
var initialMarker = new L.Marker(intialLocation);
initialMarker.addTo(map);
//add marker popup
initialMarker.bindPopup("University of Ghana Computing Systems (UGCS)")