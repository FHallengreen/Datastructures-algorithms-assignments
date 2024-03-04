"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {

  document.addEventListener("keydown", keyPress)
  document.addEventListener("keyup", logKey)
  tick();
}

function tick() {
  setTimeout(tick, 550);

  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }
  /*   console.log(controls)
  console.log(direction) */
  
  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  }

  if (controls.left) {
    direction = "left"
  }
  else if (controls.right) {
    direction = "right";
  }
  else if (controls.up) {
    direction = "up";
  }
  else if (controls.down) {
    direction = "down";
  }


  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = 9;
      }
      break;
    case "right":
      head.col++;
      if (head.col > 9) {
        head.col = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = 9;
      }
      break;
    case "down":
      head.row++;
      if (head.row > 9) {
        head.row = 0;
      }
      break;
  }


  queue.push(head);
  queue.shift();
  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }
  // display the model in full
  displayBoard();
}

// ******** MODEL ********
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let direction = "left";

const controls = {
  left: false,
  up: false,
  down: false,
  right: false,
}

const queue = [
  {
    row: 5,
    col: 5,
  },
  {
    row: 5,
    col: 6,
  },
  {
    row: 5,
    col: 7,
  },
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

function keyPress(event) {
  switch (event.key) {
    case "a":
    case "ArrowLeft":
      controls.left = true;
      break;
    case "d":
    case "ArrowRight":
      controls.right = true;
      break;
    case "w":
    case "ArrowUp":
      controls.up = true;
      break;
    case "s":
    case "ArrowDown":
      controls.down = true;
      break;
  }
}

function logKey(event) {
  switch (event.key) {
    case "a":
    case "ArrowLeft":
      controls.left = false;
      break;
    case "d":
    case "ArrowRight":
      controls.right = false;
      break;
    case "w":
    case "ArrowUp":
      controls.up = false;
      break;
    case "s":
    case "ArrowDown":
      controls.down = false;
      break;
  }
}

// ******** VIEW ********

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
