//
// End of round map
//

function rminitialize() {

    var mapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map($('#roundMap')[0], mapOptions);
    var bounds = new google.maps.LatLngBounds();

    bounds.extend(window.locLL);
    var actualMarker = new google.maps.Marker({
        position: window.locLL,
        title: "Actual Location",
        icon: 'img/actual.png'
    });
    actualMarker.setMap(map);

    if (window.guessLatLng !== null) {

        bounds.extend(window.guessLatLng);
        var guessMarker = new google.maps.Marker({
            position: window.guessLatLng,
            title: "Your Guess",
            icon: 'img/guess.png'
        });
        guessMarker.setMap(map);
    }

    map.fitBounds(bounds);

    if (window.guessLatLng === null)
        map.setZoom(2);
};