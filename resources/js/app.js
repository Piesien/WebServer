/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAyD1hhGZ21d25MXX3FVEmOkK9rhpP_8PI",
    authDomain: "piesien-6634e.firebaseapp.com",
    databaseURL: "https://piesien-6634e.firebaseio.com",
    projectId: "piesien-6634e",
    storageBucket: "piesien-6634e.appspot.com",
    messagingSenderId: "773809530700"
};

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 56.9496, lng: 24.1052},
        zoom: 14
    });

    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
};

function existingSpot(spot) {
    return `<div>
                <div>
                ${spot.description}
                </div>
                
                <div class="spot__name">
                ${spot.name}
                </div>
            </div>`
}

function neededSpot(spot) {
    return `<div>
                <div>
                ${spot.description}
                </div>
                
                <div class="spot__name">
                ${spot.name}
                </div>
                <div>
                    <span>Votes: </span>${spot.votes}
                </div>
                <div>
                    <button class="button" id="vote-button">Vote</button>
                </div>
            </div>`
}

function createNewSpotContent() {
    return `<div class="input-row">
<input type="text" class="input" name="name" placeholder="Name">
<input type="text" class="input" name="description" placeholder="description">
<button class="button" id="create">Create</button>
</div>`
}

firebase.initializeApp(config);
initMap();

var markersArray = [];

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}
var spots = firebase.database().ref('spots');

let infoWindow = new google.maps.InfoWindow({maxWidth: 320});

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    map.panTo(latLng);

    infoWindow.setContent(createNewSpotContent());
    infoWindow.open(map, marker);

    map.addListener('click', function(e) {
        marker.setMap(null);
    });

    infoWindow.addListener("closeclick", function () {
        marker.setMap(null);
    })
}

spots.on('value', function (snapshot) {
    clearOverlays();
    let fspots = snapshot.val();

    let fkeys = Object.keys(fspots);
    let fvals = Object.values(fspots);

    fvals.map((item, i) => item.id = fkeys[i]);

    fvals.map((spot) => {

        function infoString(spot) {
            if (spot.type === "exists") {
                return existingSpot(spot);
            } else {
                return neededSpot(spot);
            }
        }

        var marker = new google.maps.Marker({
            position: {lat: spot.latitude, lng: spot.longitude},
            map: map,
            icon: ((spot.type === "exists") ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
        });
        markersArray.push(marker);

        marker.addListener('click', () => {
            infoWindow.setContent(infoString(spot));
            infoWindow.open(map, marker);

            if(document.getElementById("vote-button")) {
                document.getElementById("vote-button").addEventListener("click", function (evt) {
                    firebase.database().ref("spots/"+spot.id+"/votes").set(spot.votes + 1);
                });
            }
        });
    });
});
