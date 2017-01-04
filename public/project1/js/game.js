$( document ).ready( function() {

  console.log('loaded and ready to go');

  var board = [];
  var game = {
    rows: 60,
    columns: 60,
    speed: 500,
    density: 1.2,
    pxWide: $('.board').width(),
    pxHigh: $('.board').height()
  };



  // stores all the player values, including coordinates
  var player = {
    x: 0,
    y: 0,
    hp: 300,
    angle: 0,
    width: $('.player').width(),
    projectiles: 0,
    projInt: null,
    projID: 0
  }

  var enemy = {
    x: 0,
    y: 0,
    hp: 1,
    angle: 0,
    width: $('.enemy').width(),
    dropInterval: 10
  }

  var projectiles = {};

  var keys = {};

  // initializes the main function




  // initializes a new board, and randomly seeds it with new 'life' i.e. red squares / 1's
  function initBoard () {

   for (var r=0; r < game.rows; r++) {
        board.push([]);
   };

   for (var row = 0; row < game.rows; row++) {
    for (var column = 0; column < game.columns; column++) {
      var randNum = Math.floor(Math.random()*game.density);
      // var randNum = 1; //for testing
      board[row].push(randNum);
      var idText = [row, '-', column].join('');
      $newBlock = $('<div class = "box">');
      $newBlock.attr('id', idText);
      if (randNum === 1) {
        $newBlock.css('background', 'red')
      };
      $('.board').append($newBlock);
    }
  }
}

  // creates and returns an array full of 0's
  function clearBoard() {
    board = [];
  for (var r=0; r < game.rows; r++) {
        board.push([]);
   }
   for (var row = 0; row < game.rows; row++) {
    for (var column = 0; column < game.columns; column++) {
      board[row].push(0);
      }
    }
  }

  // finds a box at the specified coordinates by ID, and returns that box
  function getBox (x, y) {
    var position = ['#', x, '-', y].join('');
    return $(position);
  }

  // for (var row = 0; row < 10; row++) {
  //   for (var column = 0; column < 10; column++) {
  //     var $myBox = getBox(row, column);
  //     var r = Math.floor(255 * Math.random());
  //     var g = Math.floor(255 * Math.random());
  //     var b = Math.floor(255 * Math.random());
  //     var sqColor = 'rgba('+[r, g, b, '1'].join(',')+')';
  //     $myBox.css('visibitity', sqColor);
  //   };
  // };





  // sums up and returns all the neighbors values in the array
  // checks to see if the neighbor position is out of bounds
  function neighborSum (x, y)  {
    var sum = 0;
    xBound = game.columns - 1;
    yBound = game.rows - 1;
    var b = board;

    if ((x === 0) && (y === 0)){
      sum =  b[x+1][y+1]+ b[x+1][y] + b[x][y+1];
    } else if ((x === xBound) && (y === yBound)){
      sum = b[x-1][y]+ b[x-1][y-1] + b[x][y-1];
    } else if ((x === 0) && (y === yBound)){
      sum = b[x][y-1]+ b[x+1][y-1] + b[x+1][y];
    } else if ((x === xBound) && (y === 0)){
      sum = b[x-1][y]+ b[x-1][y+1] + b[x][y+1];
    } else if (x === xBound){
      sum = b[x][y+1] + b[x][y-1] + b[x-1][y+1] + b[x-1][y-1] + b[x-1][y];
    } else if (y === yBound){
      sum = b[x+1][y] + b[x-1][y] + b[x+1][y-1] + b[x][y-1] + b[x-1][y-1];
    } else if (x === 0){
      sum = b[x][y+1] + b[x][y-1] + b[x+1][y+1] + b[x+1][y] + b[x+1][y-1];
    } else if (y === 0){
      sum = b[x+1][y] + b[x-1][y] + b[x+1][y+1] + b[x][y+1] + b[x-1][y+1];
    } else {
      sum = b[x+1][y] + b[x-1][y] + b[x][y+1] + b[x][y-1] + b[x+1][y+1] + b[x-1][y-1]+ b[x+1][y-1]+ b[x-1][y+1];

    }
    return sum;
  }

     function lifeGen() {
     x = 0;
     y = -1;
     yBound = 0;
     arrLen = board[0].length;
     // Using array.map() to non-destructively iterate through, modify and return the game board.
     // using the format array = array.map(items=>items.map(item=>item))
     // Thanks Jason for pointing me in this direction!
     board = board.map( function (items) {
       y++;
       return items.map( function(cellVal) {
         // resets the board length counter to prevent overflow
         if (x === arrLen) {
           x = 0;
         };
         var neighbors = neighborSum (y, x);
         var state = null;
         // Basic rules of the Game of Life:
         // If the cell is alive, then it stays alive only if it has  2 or 3 live neighbors.
         if (cellVal ===  2){
            x++;
            getBox(x, y).css('background', 'gray');
            return 2;
         } else if ((cellVal === 1) && (( neighbors <= 3 ) && (neighbors >= 2))) {
           state = 1;
         // If the cell is dead, then it becomes alive only if it has 3 live neighbors.
         } else if ((cellVal === 0) && (neighbors === 3)) {
           state = 1;
            getBox(x, y).css('background', 'red');
         } else {
           state = 0;
           getBox(x, y).css('background', 'white');
         };
         x++;
         return state;
       });
      });
    }


 initBoard();
 var gameOfLife = setInterval(lifeGen, game.speed);

/// end of game of life code ----------------------


// need a way to 'launder' vars due to scoping and reference issues
function launderVar(a) {
  var b = String(a);
  return parseFloat(b);
}


var cell = {
    width: $('.box').width(),
    state: null
};

// holds multiple key presses
// adapted this from code found in stack exchange
function initMove() {
  $(document).keydown(function(event) {
    keys[event.key] = true;
    selectMove();
  });

  $(document).keyup(function (event) {
    delete keys[event.key];
  });
}

  // initializes the key and movement handlers for the game
  function selectMove () {
    switch (event.key) {
        case 'w':
        movePlr(10); // forward
        break;
      case 'a':
        turnPlr(-15); //backward
        break;
      case 's':
        movePlr(-10); //left
        break;
      case 'd':
        turnPlr(15); //right
        break;
      case 'r':
        initBoard(game.density);
        break;
      case 'f':
        fireProj(false);
        console.log("firing")
        break;
      default:
        break;
      }
  };




  // translates the position of the player depending on their angle
  // also does wall detection
  function movePlr(dir){
    xAngle = dir * Math.cos((Math.PI/180) * player.angle);
    yAngle = dir * Math.sin((Math.PI/180) * player.angle);
    player.x = checkBounds(player.x, xAngle, game.pxWide)
    player.y = checkBounds(player.y, yAngle, game.pxHigh)
    // var translate = 'translate('+plrPos.x+'px,'+plrPos.y+'px)'
    $('.player').animate({
      left: player.x+'px',
      top: player.y+'px'
    }, 200);
  }

  // rotates the player according to their rotation amount
  function turnPlr(dir){
    player.angle += dir
    console.log(player.angle);
    $('.player').css({transform: 'rotate(' + player.angle + 'deg)'}, 200);
  }



function collisionDetect () {
  var touchCells = 0;
  var boardX = player.x / cell.width;
  var boardY = player.y / cell.width;
  var playerMax = player.width / cell.width;
  touchCells += board[Math.floor(boardX)][Math.floor(boardY)];
  touchCells += board[Math.ceil(boardX)][Math.ceil(boardY)];
  touchCells += board[Math.floor(boardX)][Math.ceil(boardY)];
  touchCells += board[Math.ceil(boardX)][Math.floor(boardY)];
  touchCells += board[Math.floor(boardX+playerMax)][Math.floor(boardY+playerMax)];
  touchCells += board[Math.ceil(boardX+playerMax)][Math.ceil(boardY+playerMax)];
  touchCells += board[Math.floor(boardX+playerMax)][Math.ceil(boardY+playerMax)];
  touchCells += board[Math.ceil(boardX+playerMax)][Math.floor(boardY+playerMax)];
  if (touchCells > 0) {
    injurePlayer();
  }
}

function injurePlayer (){
  player.hp -= 3;
  var health = player.hp + 'px';
  $('.healthbar').css("width", health);
  if (player.hp <= 0) {
    console.log('game over');
    clearInterval(collisions);
    clearInterval(gameOfLife);
    $(document).off('keydown');
    $(document).off('keyup');
    $('.board').empty();
    $('.board').append('<h1>Game Over!</h1>');
  }
};
   // prevents player from going outside the boundaries. Destroys if a projectile.
  function checkBounds (position, trans, maxDim, object) {
    if (((position + trans) < 0) || ((position + trans) > maxDim)){
      if (object != undefined) {
        console.log("deleting" + object);
          $(object).remove();
          delete projectiles[object];
          player.projectiles --;
          return true;
        }
      return position;
      } else {
      return position + trans;
    };
  }

  function initProj() {
    if (player.projectiles === 0) {
      player.projectiles ++;
      player.projInt = setInterval(eachProj, 100)
    } else {
      player.projectiles ++;
    };
  }

  function eachProj () {
    if (player.projectiles === 0){
      clearInterval(player.projInt);
    } else {
  for (var projByID in projectiles) {
      moveProj(projectiles[projByID].id);
      };
    }
  };


  // creates a new projectile, and sets it in the position of the player
  function fireProj(fireInterval) {
    if (true) {
      // creates a projectile DOM element with a unique ID
      var projectileID = '<div class="projectile" ID="' + player.projID + 'p"></div>';
      player.projID ++;
      var projSpeed = 5;
      $projectile = $(projectileID);
      $('.board').append($projectile);
      console.log($projectile);
      projectileID = '#'+ player.projectiles + 'p';
      var projAngle = launderVar(player.angle)
      xAngle = Math.cos((Math.PI/180) * projAngle) * projSpeed;
      yAngle = Math.sin((Math.PI/180) * projAngle) * projSpeed;
      console.log (xAngle, yAngle, player.angle)
      var projX = player.x + (player.width / 2)
      var projY = player.y + (player.width / 2)
      console.log(projX, projY);
      $(projectileID).css({
        left: projX + 'px' ,
        top: projY + 'px'
      });
      // makes a new projectile object, accessed by the DOM ID name
      projectiles[projectileID] = {
        id: projectileID,
        x: projX,
        y: projY,
        xAngle: xAngle,
        yAngle: yAngle,
        decay: 100,
        speed: projSpeed
      };
    };
    initProj();
  }

// checks for collisions, and moves specified projectile
function moveProj(projID){
  var moveX = checkBounds(projectiles[projID].x, projectiles[projID].xAngle, game.pxWide, projID)
  if (moveX === true){
    return true;
  };
  var moveY = checkBounds(projectiles[projID].y, projectiles[projID].yAngle, game.pxHigh, projID)
  if (moveY === true){
    return true;
  };
  projectiles[projID].x = moveX
  projectiles[projID].y = moveY
  // checks if the projectile has hit any targets before moving
  if (cellHit(projID) === true) {
    return true;
  }
  if (enemyHit(projID) === true) {
    return true;
  }
  $(projID).animate({
    left: projectiles[projID].x +'px',
    top: projectiles[projID].y+'px'
  }, 0);
}
// if a projectile collision is detected, set the value and color of the cell
function cellHit (projID) {
  console.log(projectiles[projID].x);
  var touchCell = 0;
  var boardX = Math.round(projectiles[projID].x / cell.width);
  var boardY = Math.round(projectiles[projID].y / cell.width);
  console.log(boardY, boardX);
  touchCell = board[boardX][boardY];
  if (touchCell > 0) {
    board[boardY][boardX] = 0;
    var $cell = getBox(boardY, boardX)
    $cell.css('background', 'white');
    console.log ($cell, " has been destroyed at ", boardX, boardY);
    //removes the projectile from the board
    $(projID).remove();
    delete projectiles[projID];
    player.projectiles --;
    return true;
  }
  return false;
}

function enemyHit(projID) {
  return false;
}

function enemyMove() {

}

function enemyDrop () {

}

initMove();
var collisions = setInterval(collisionDetect, 200);

//end of the DOM load script
});



