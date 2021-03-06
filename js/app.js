$(document).ready(function () {
  //
  // Setup
  //

  var round = 1;
  var points = 0;
  var roundScore = 0;
  var totalScore = 0;
  var distance;

  //
  //  Init maps
  //

  svinitialize();
  mminitialize();


  function onGuessModeEnded(inTime, guessLatLng) {
    if (inTime) {
      calcGuessPoints(guessLatLng);
    } else {
      points = 0;
      distance = null;
    }

    endRound();
  };

  guessMode.onGuessEnded = onGuessModeEnded;

  // Start from guess mode
  guessMode.initGuess();

  // End of round continue button click
  $('#roundEnd').on('click', '.closeBtn', function () {
    $('#roundEnd').fadeOut(500);

    if (round >= 5) {
      endGame();
    }
    else {
      // Reload maps to refresh coords
      rminitialize();
      svinitialize();
      mminitialize();

      guessMode.initGuess();
      round++;
      $('.round').html('Current Round: <b>' + round + '/5</b>');
    }
  });

  // End of game 'play again' button click
  $('#endGame').on('click', '.playAgain', function () {
    window.location.reload();
  });

  //
  // Functions
  //

  function calcGuessPoints(guessLatLng) {
    // Calculate distance between points, and convert to kilometers
    distance = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(window.locLL, guessLatLng) / 1000);
    points = Math.ceil(Math.max(9000 - 1000 * Math.log(distance), 0));
  }

  function endRound() {

    roundScore = points;
    totalScore = totalScore + points;


    $('.roundScore').html('Last Round Score: <b>' + roundScore + '</b>');
    $('.totalScore').html('Total Score: <b>' + totalScore + '</b>');

    // If distance is null, that means they ran out of time and didn't click the guess button
    if (distance === null) {
      $('#roundEnd').html('<p>Dang nabbit! You took too long!.<br/> You didn\'t score any points this round!<br/><div id="roundMap"></div><br/><button class="btn btn-primary closeBtn" type="button">Continue</button></p></p>');
      $('#roundEnd').fadeIn();
    } else {
      $('#roundEnd').html('<p>Your guess was<br/><strong><h1>' + distance + '</strong>km</h1> away from the actual location.<br/><div id="roundMap"></div><br/> You have scored<br/><h1>' + roundScore + ' points</h1> this round!<br/><br/><button class="btn btn-primary closeBtn" type="button">Continue</button></p></p>');
      $('#roundEnd').fadeIn();
    }
    rminitialize();

  }

  function endGame() {
    $('#miniMap, #pano, #guessButton, #scoreBoard, #timer').hide();
    $('#endGame').html('<h1>Congrats!</h1><h2>Your final score was:</h2><h1>' + totalScore + '!</h1>'
    +'<br/><button class="btn btn-large btn-success playAgain" type="button">Play Again?</button>');
    $('#endGame').fadeIn(500);

    rminitialize();

    // We're done with the game
    window.finished = true;
  }
});
