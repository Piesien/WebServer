
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
        zoom: 8
    });
};

firebase.initializeApp(config);
initMap();

var spots = firebase.database().ref('spots');

spots.on('value', function(snapshot) {
    let fspots = snapshot.val();
    let markers = fspots.map(({latitude, longitude, id}) => {
        return new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            label: id,
            map: map
        });
    });
});
