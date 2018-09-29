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

    let legendObj = document.getElementById("legend-items");
    let legendItems = [];
    for (let i = 0; i < legendObj.childNodes.length; i++) {
        if (legendObj.childNodes[i].className == "legend-item") {
            legendItems.push(legendObj.childNodes[i]);
        }
    }
    legendItems.map(function(item) {
        item.addEventListener('click', function (e) {
            type = this.dataset.type;

            let filtered = fvals;

            if (type != 'clear') {
                filtered = filtered.filter(function (val) {
                    return val.type == type;
                });
            };

            renderPins(filtered);
        });
    });
};

function existingSpot(spot) {
    return `<div class="spot spot--existing">
                <div>
                ${spot.description}
                </div>
                
                <div class="spot__name">
                ${spot.name}
                </div>
            </div>`
}
function rSpot(spot) {
    return `<div class="spot spot--r">
                <div>
                ${spot.description}
                </div>
                
                <div class="spot__name">
                ${spot.name}
                </div>
            </div>`
}

function neededSpot(spot) {
    return `<div class="spot spot--needed">
                <div class="spot__name">
                    ${spot.name}
                </div>
                <div class="spot__description">
                ${spot.description}
                </div>
                <div class="spot__votes">
                    <span>Votes: </span>${spot.votes}
                </div>
                <div>
                    <button class="button" id="vote-button">Vote</button>
                </div>
            </div>`
}

function createNewSpotContent() {
    return `<div class="input-row">
<input type="text" class="input" name="name" placeholder="Name" id="name-input">
<input type="text" class="input" name="description" placeholder="description" id="description-input">
<button class="button" id="create-button">Create</button>
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
var type = 'clear';
var spots = firebase.database().ref('spots');

let infoWindow = new google.maps.InfoWindow({maxWidth: 320});

function writeNewSpot(latLng) {
    var name = document.getElementById("name-input").value;
    var desc  = document.getElementById("description-input").value;
    var spotData = {
        description: desc,
        latitude: latLng.lat(),
        longitude: latLng.lng(),
        name: name,
        type: "needed",
        votes: 1
    };

    var newPostKey = firebase.database().ref().child('spots').push().key;


    var updates = {};
    updates['/spots/' + newPostKey] = spotData;

    firebase.database().ref().update(updates);
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: '/img/ic_place_needed.png'
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

    if(document.getElementById("create-button")) {
        document.getElementById("create-button").addEventListener("click", function (evt) {
            writeNewSpot(latLng);
            marker.setMap(null);
        });
    }
}

spots.on('value', function (snapshot) {
    clearOverlays();
    let fspots = snapshot.val();

    let fkeys = Object.keys(fspots);
    fvals = Object.values(fspots);

    if(type != 'clear'){
        fvals.filter(function (val) {
            return val.type == type;
        });
    }

    fvals.map((item, i) => item.id = fkeys[i]);

    renderPins(fvals);
});

function renderPins(spots) {
    clearOverlays();

    let needed = spots.filter(val => val.votes > 0);

    needed.sort(function (a, b) {
        return b.votes - a.votes;
    });

    populateList(needed.slice(0, 10));

    spots.map((spot) => {

            let icon = '/img/';
            if (spot.type === "exists") {
                icon += 'ic_place_exists.png';
            } else if (spot.type === "r") {
                icon += 'ic_place_r.png';
            } else {
                icon += 'ic_place_needed.png';
            }

            function infoString(spot) {
                if (spot.type === "exists") {
                    icon += 'ic_place_exists.png';
                    return existingSpot(spot);
                } else if (spot.type === "r") {
                    icon += 'ic_place_r.png';
                    return rSpot(spot);
                } else {
                    icon += 'ic_place_needed.png';
                    return neededSpot(spot);
                }
            }

            var marker = new google.maps.Marker({
                position: {lat: spot.latitude, lng: spot.longitude},
                map: map,
                icon: icon
            });
            markersArray.push(marker);

            marker.addListener('click', () => {
                infoWindow.setContent(infoString(spot));
                infoWindow.open(map, marker);

                if (document.getElementById("vote-button")) {
                    document.getElementById("vote-button").addEventListener("click", function (evt) {
                        firebase.database().ref("spots/" + spot.id + "/votes").set(spot.votes + 1);
                    });
                }
            });
        });
};


function voteFromList (id, votes) {
    firebase.database().ref("spots/"+id+"/votes").set(votes + 1);
}

function populateList (toplist) {
    if (document.getElementById('toplist') !== null) {
        document.getElementById('list').removeChild(document.getElementById('toplist'));}
    var ul = document.createElement('ul');
    ul.setAttribute('id','toplist');

    document.getElementById('list').appendChild(ul);
    toplist.forEach(renderList);

    function renderList(element, index, arr) {
        var li = document.createElement('li');
        li.setAttribute('class','item');
        // console.log(element);

        ul.appendChild(li);
        var btn = document.createElement('button');
        btn.setAttribute('id','vote-btn');
        btn.onclick = function(){voteFromList(element.id, element.votes );};
        btn.innerHTML = "Vote"

        var dv = document.createElement('div');
        dv.setAttribute('id','item-row');
        dv.innerHTML = dv.innerHTML +"<span><b>Votes: </b>" + element.votes + "</span>"
        dv.appendChild(btn);
        li.innerHTML=li.innerHTML + element.name + "<br/>";
        li.appendChild(dv);

    }
}
