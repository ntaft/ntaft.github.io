$( document ).ready( function() {

  console.log('loaded and ready to go');

  var board = [];

  var speed = 300;
  initBoard (100, 100, 1.1);

  function initBoard (width, height, density) {

   for (var r=0; r < height; r++) {
        board.push([]);
   };

   for (var row = 0; row < height; row++) {
    for (var column = 0; column < width; column++) {
      var randNum = Math.floor(Math.random()*density)
      board[row].push(randNum);
      var idText = [row, '-', column].join('');
      $newBlock = $('<div class = "box">');
      $newBlock.attr('id', idText);
      if (randNum === 1) {
        $newBlock.css('background', "red")
      } else {
        $newBlock.css('background', "gray")
      }
      $('.board').append($newBlock);
    };
   };
  };


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
  //     $myBox.css('background', sqColor);
  //   };
  // };

  var pos = {
    // gets gameboard positions and returns the value
    boardWidth: function() {return $('.board')[0].clientWidth },
    boxWidth: function() {return $('.box')[0].clientWidth },
    plWidth: function () {return $('.player')[0].clientWidth },
    plOffsetX: function() {return $('.player').offset().left },
    plOffsetY: function () {return $('.player').offset().bottom }
  };

  function checkBounds (i, arr) {
    switch (i) {
    case 0:
      return -1;
    case (arr.length - 1):
        return 1;
    default:
        return 0;
      }
  }

  // sums up and returns all the neighbors values in the array
  // checks to see if the neighbor position is out of bounds
  // function neighborSum (r, c, rBound, cBound)  {
  //   var sum = 0
  //   if (cBound <= 0){
  //     sum += board[r][c+1];
  //   }
  //   if (cBound >= 0){
  //     sum += board[r][c-1];
  //   }
  //   if (rBound <= 0){
  //     sum += board[r+1][c];
  //   }
  //   if (rBound >= 0){
  //     sum += board[r-1][c];
  //   }
  //   if ((rBound <= 0) && (cBound <= 0)){
  //     sum += board[r+1][c+1];
  //   }
  //   if ((rBound >= 0) && (cBound >= 0)){
  //     sum += board[r-1][c-1];
  //   }
  //   if ((rBound >= 0) && (cBound <= 0)){
  //     sum += board[r-1][c+1];
  //   }
  //   if ((rBound <= 0) && (cBound >= 0)){
  //     sum += board[r+1][c-1];
  //   }
  //   //console.log(sum);
  //   return sum;
  // };

  // iterates through the 2d array and computes the next generation of "life"
  function lifeGen() {
    var yBound = 0;
    var xBound = 0;
    var nextBoard = board;
    for (var y = 1; y < board.length - 1; y++) {
      // var yBound = checkBounds(y, board);
      for (var x = 1; x < board[0].length - 1; x++) {
        // var xBound = checkBounds(x, board[0]);
        var g = board
        var neighbors = (g[(x+1)][(y+1)])+(g[(x+1)][(y-1)])+(g[(x-1)][(y+1)])+(g[(x-1)][(y-1)])+(g[x][(y+1)])+(g[x][(y-1)])+(g[(x+1)][y])+(g[(x-1)][y]);
        var cellVal = board[x][y];
        // Basic rules of the Game of Life:
        // If the cell is alive, then it stays alive only if it has  2 or 3 live neighbors.
        if ((cellVal === 1) && (( neighbors === 2 ) || (neighbors === 3))) {
          nextBoard[x][y] = 1;
          // console.log(neighbors, " is dead");
          getBox(x, y).css('background', 'white');
        // If the cell is dead, then it becomes alive only if it has 3 live neighbors.
        } else if ((cellVal === 0) && (neighbors === 3)) {
          nextBoard[x][y] = 1;
          // console.log(neighbors, " is born");
           getBox(x, y).css('background', 'red');
        // } else if (neighbors > 3){
        //   getBox(x, y).css('background', "rgb(150, 150, 150)");
        //   board[x][y] = 0;
        } else {
          board[x][y] = 0;
          getBox(y, x).css('background', "white");
        }
      };
    };
    // to keep from contaminating the original array on the fly
    board = nextBoard;
  }

  // function animateBox(x, y, color) {
  //   getBox(x, y).animate({
  //     background: color,
  //     left: "+=50"
  //   }, 1000);
  // }


  setInterval(lifeGen, speed);
  });

