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
            map: map
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
