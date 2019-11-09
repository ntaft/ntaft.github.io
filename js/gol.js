document.addEventListener('DOMContentLoaded', () => {
  // sets up canvas variables
  const canvas = document.querySelector('.board');
  const context = canvas.getContext('2d');

  // sets up board variables
  const dot = {};
  let board = [];
  let gameOfLife;
  // TODO: set up default row col numbers based on window dimension ratio
  const game = {
    rows: 50,
    // columns: Math.floor((window.innerHeight / window.innerWidth) * 50),
    columns: 50,
    margin: 1,
    speed: 200, // in ms per gen
    density: 1.2,
    cellColor: '#3b5998',
    background: 'rgb(250, 250, 250)',
    generations: 0,
  };

  // Sets canvas dimensions and corresponding dot and margin size; redraws canvas
  function setDimensions() {
    canvas.width = window.innerWidth;
    // TODO: confirm this works properly
    // canvas.height = window.innerHeight - (game.columns % window.innerHeight);
    canvas.height = window.innerWidth;
    dot.width = (canvas.width - 2 * game.margin) / game.columns - game.margin;
    dot.height = (canvas.height - 2 * game.margin) / game.rows - game.margin;
    // Adapted from http://cobwwweb.com/mutlicolored-dotted-grid-canvas
    // Uses the limiting dimension to set the diameter
    if (dot.width > dot.height) {
      dot.diameter = dot.height;
      dot.xMargin = (canvas.width - (2 * game.margin + game.columns * dot.diameter))
        / game.columns;
      dot.yMargin = game.margin;
    } else {
      dot.diameter = dot.width;
      dot.xMargin = game.margin;
      dot.yMargin = (canvas.height - (2 * game.margin + game.rows * dot.diameter))
        / game.rows;
    }
  }

  // // implementation of offscreen canvas is still shaky on many browsers...
  // // but might speed up performance
  // board.offscreenCanvas = document.createElement("canvas");
  // board.offscreenCanvas.width = canvas.height;
  // board.offscreenCanvas.height = canvas.width;
  // board.offscreenContext = board.offscreenCanvas.getContext("2d");
  // // grabs the offscreen image
  // let image = board.offscreenContext.getImageData(0, 0, canvas.height, canvas.width);
  // // copy onto the visible canvas
  // context.putImageData(image, 0, 0);

  // initializes a new board, and randomly seeds it with new 'life' i.e. 1's
  function initBoard() {
    game.generations = 0;
    board = [];
    for (let r = 0; r < game.rows; r += 1) {
      board.push([]);
    }

    for (let row = 0; row < game.rows; row += 1) {
      for (let column = 0; column < game.columns; column += 1) {
        const randNum = Math.floor(Math.random() * game.density);
        board[row].push(randNum);
      }
    }
  }

  // creates and returns an array full of 0's
  function zeroBoard() {
    board = [];
    for (let r = 0; r < game.rows; r += 1) {
      board.push([]);
    }
    for (let row = 0; row < game.rows; row += 1) {
      for (let column = 0; column < game.columns; column += 1) {
        board[row].push(0);
      }
    }
  }

  // sums up and returns all the neighbors values in the array
  function neighborSum(x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        // if neighbor position is out of bounds, return 0
        const neighborVal = (board[y + i] && board[y + i][x + j]);
        sum += neighborVal || 0;
      }
    }
    // return the value of all neighbors minus the value of the cell itself
    return sum - board[y][x];
  }

  // overlays the board with a blank rectangle
  function clearDots() {
    context.fillStyle = 'rgba(250, 250, 250, 0.7)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  // draws each 'dot' - currently in the shape of a rectangle.
  function drawDot(x, y, diameter, color) {
    // calculates the dot positioning based on the px margin, px diameter and board position
    const xPos = x * (dot.diameter + dot.xMargin) + game.margin + dot.xMargin / 2;
    const yPos = y * (dot.diameter + dot.yMargin) + game.margin + dot.yMargin / 2;
    if (xPos < canvas.width && yPos < canvas.height) {
      context.fillRect(xPos, yPos, diameter, diameter);
    }
    // for circles...
    // context.beginPath();
    // context.arc(x, y, diameter / 2, 0, 2 * Math.PI, false);
    // context.fill();
  }

  function lifeGen() {
    clearDots();
    game.generations += 1;
    document.querySelector(
      '.gen',
    ).innerHTML = `Generation:<br>${game.generations}`;
    context.fillStyle = game.cellColor;
    board = board.map((rows, y) => rows.map((cellVal, x) => {
      const neighbors = neighborSum(x, y);
      let state = 0;
      // Basic rules of Conway's Game of Life:
      // If the cell is alive, then it stays alive only if it has  2 or 3 live neighbors.
      // If the cell is dead, then it becomes alive only if it has 3 live neighbors.
      const wasAlive = Boolean(cellVal);
      const isAlive = (wasAlive && neighbors === 2) || neighbors === 3;
      if (isAlive) {
        state = 1;
        drawDot(x, y, dot.diameter);
      }
      return state;
    }));
  }

  // pauses / unpauses the animation on click
  function pauseHandler(e) {
    const pauseBtn = document.querySelector('.pause');
    e.stopPropagation();
    if (gameOfLife) {
      clearInterval(gameOfLife);
      gameOfLife = null;
      pauseBtn.style.backgroundImage = 'url("assets/play.svg")';
    } else {
      gameOfLife = setInterval(lifeGen, game.speed);
      pauseBtn.style.backgroundImage = 'url("assets/pause.svg")';
    }
  }

  // allows a single generation 'step' followed by pausing the animation.
  function stepHandler() {
    if (gameOfLife) {
      clearInterval(gameOfLife);
      gameOfLife = null;
      document.querySelector('.pause').style.backgroundImage = 'url("assets/play.svg")';
    }
    lifeGen();
  }

  // resets the board to default state
  function resetHandler() {
    clearInterval(gameOfLife);
    clearDots();
    initBoard();
    if (gameOfLife) gameOfLife = setInterval(lifeGen, game.speed);
    else lifeGen();
  }

  // zeroes out the board to a blank state
  function clearHandler() {
    zeroBoard();
    clearDots();
  }

  // helper class that gets/sets the cell state and draws to canvas given the px coordinates
  class Cell {
    constructor(xPos, yPos) {
      // converts the on screen px position to the 2d array position
      this.x = Math.floor(xPos / (dot.diameter + dot.xMargin));
      this.y = Math.floor(yPos / (dot.diameter + dot.yMargin));
    }

    // getter and setter for the cell state, 0 or 1
    get state() {
      return board[this.y][this.x];
    }

    set state(val) {
      board[this.y][this.x] = val;
    }

    // flips the cell bit to the designated state and draws to canvas
    draw(bit) {
      if (this.state !== bit) {
        this.state = bit;
        context.fillStyle = bit ? game.cellColor : game.background;
        drawDot(this.x, this.y, dot.diameter);
      }
    }
  }

  // toggles cell state on click and drag
  function dragCell(e) {
    e.stopPropagation();
    if (
      e.clientX > 0
      && e.clientX < canvas.width
      && (e.clientY > 0 && e.clientY < canvas.height)
    ) {
      const dragPos = new Cell(e.clientX, e.clientY);
      dragPos.draw(e.shiftKey ? 0 : 1);
    }
  }

  // toggles the cell state on click; shift removes cells
  function toggleCell(e) {
    e.stopPropagation();
    const mousePos = new Cell(e.clientX, e.clientY);
    mousePos.draw(e.shiftKey ? 0 : 1);
    document.addEventListener('mousemove', dragCell);
  }

  // button handlers
  document.querySelector('.pause').addEventListener('click', pauseHandler);
  document.querySelector('.step').addEventListener('click', stepHandler);
  document.querySelector('.reset').addEventListener('click', resetHandler);
  document.querySelector('.clear').addEventListener('click', clearHandler);

  // event listeners for edit functionality
  document.addEventListener('mousedown', toggleCell);
  document.addEventListener('mouseup', () => document.removeEventListener('mousemove', dragCell));


  // sets initial board dimensions
  // sets the initial board state and speed
  initBoard();
  setDimensions();
  lifeGen();
  gameOfLife = setInterval(lifeGen, game.speed);
  // event listener on window resize; resets dimensions and triggers redraw
  window.addEventListener('resize', setDimensions);
});
