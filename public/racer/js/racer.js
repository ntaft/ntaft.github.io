$(document).ready(function(){ //runs after HTML loads
  // on click the game starts
  $('html').click(ppapGame);

  // the game
   function ppapGame () {
    $(".game-header > h2").html(" ")
    // sets up the win variables
    var oneWin = 0;
    var twoWin = 0;
    // an apple flies across the screen...
    $('#fruit-one').animate({left : '85%'}, {
      duration: 8000,
      step: function() { // if the win condition is met...
        if (oneWin >= 1) {
          $('#fruit-one').stop() //stop the animation
          $(".game-header > h2").html("Uh! Apple Pen!");
        }
      }
    });
    // same as above, for the pineapple this time
    $('#fruit-two').animate({left : '85%'}, {
      duration: 8000,
      step: function() {
        if (twoWin >= 1) {
          $('#fruit-two').stop()
          $(".game-header > h2").html("Uh! Pineapple Pen!");
        }
      }
    });


    // checks for key presses...
    $('html').keydown(moveRight);

    // triggered at key press
    function moveRight(event) {
      //first check if there is a win condition
      checkWin();
    // moves each player left depending on the key pressed
        switch (event.key) {
          case 'z':
           // as long as a player 1 has not yet won...
            if (checkPos('one') === 'one') {
              console.log (1);
              oneWin += 1
              break;
            }
            // otherwise move player 1
            $('#player-one').animate({left : '+=2%'}, 100);
            break;

          case 'ArrowUp':
           // as long as a player 2 has not yet won...
            if (checkPos('two') === 'two') {
              console.log (2);
              twoWin += 1
              break;
            }
            // move player 2
            $('#player-two').animate({left : '+=2%'}, 100);
            break;

          default:
            break;
        }
    }

    //checks for the win condition
    function checkWin(){
        if (oneWin >= 1 && twoWin >= 1){
        // if both win consitions are met
        console.log('Pen Pineapple Apple Pen!');
        $('.game-header > h2').html('Pen Pineapple Apple Pen!');
        $('html').off() //removes event handlers
        $('.dancebox').css("visibility", "visible");

      }
    }

    function checkPos(playerNum) {
      // initializes all of the game board positions
      var boardWidth = $('.game-board')[0].clientWidth;
      var plWidth = $('#player-' + playerNum)[0].clientWidth;
      var plOffset = $('#player-' + playerNum).offset().left;
      var fruitPos = $('#fruit-' + playerNum).offset().left;
      var plPos = plOffset + plWidth;
      // if the player has reached the end...
      if (boardWidth < plPos ) {
        return playerNum;
      //or if they have caught the fruit...
      } else if (plPos >= fruitPos + 30) {
        return playerNum;
      }
    }
  }

});
