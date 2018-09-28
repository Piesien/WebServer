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
            </div>`
}

firebase.initializeApp(config);
initMap();

var spots = firebase.database().ref('spots');

spots.on('value', function (snapshot) {

    let fspots = snapshot.val();

    fspots.map((spot) => {

        function infoString(spot) {
            if (spot.type === "exists") {
                return existingSpot(spot);
            } else {
                return neededSpot(spot);
            }
        }

        var infowindow = new google.maps.InfoWindow({
            content: infoString(spot)
        });

        var marker = new google.maps.Marker({
            position: {lat: spot.latitude, lng: spot.longitude},
            map: map
        });

        marker.addListener('click', () => infowindow.open(map, marker));
    });
});
