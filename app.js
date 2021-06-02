const puzzle = document.querySelector('.puzzle');
const solution = document.querySelector('.solution');
var squares = [];
var solutionSquares = [];
var colors = ["red", "blue", "green", "yellow", "orange", "white"];
var puzzleColors = [];
var solutionColors = [];
var response = [];
var emptyIndex = Math.floor(Math.random() * 25);

function createPuzzle() {
  for(let i=0; i<25; i++) {
    square = document.createElement('div');
    square.classList.add("box"+i);
    puzzle.appendChild(square);
    squares.push(square);
  }
}
createPuzzle()

function createSolution() {
  for(let j=0; j<9; j++) {
    solutionSquare = document.createElement('div');
    solution.appendChild(solutionSquare);
    solutionSquares.push(solutionSquare);
  }
}
createSolution()

function generatePuzzle() {
  for(let k=0; k<25; k++) {
    if(k !== emptyIndex) {
      var newColor = colors[Math.floor(Math.random() * colors.length)]
      squares[k].style.backgroundColor = newColor;
      puzzleColors.push(newColor);
    }
  }
}
generatePuzzle();

function generateSolution() {
  for (let l=0; l<9; l++) {
    newIndex = Math.floor(Math.random() * puzzleColors.length);
    solutionSquares[l].style.backgroundColor = puzzleColors[newIndex];
    solutionColors.push(puzzleColors[newIndex]);
    puzzleColors.splice(newIndex, 1);
  }
}
generateSolution();
console.log(puzzleColors);
console.log(solutionColors);

function checkFinish() {
  response[0] = document.querySelector('.box6').style.backgroundColor;
  response[1] = document.querySelector('.box7').style.backgroundColor;
  response[2] = document.querySelector('.box8').style.backgroundColor;
  response[3] = document.querySelector('.box11').style.backgroundColor;
  response[4] = document.querySelector('.box12').style.backgroundColor;
  response[5] = document.querySelector('.box13').style.backgroundColor;
  response[6] = document.querySelector('.box16').style.backgroundColor;
  response[7] = document.querySelector('.box17').style.backgroundColor;
  response[8] = document.querySelector('.box18').style.backgroundColor;
  for(let m=0; m<9; m++) {
    if(response[m] !== solutionColors[m]) {
      break;
    } else if(m===8) {
      youWin();
    }
  }
  console.log(response);
}

function MoveUp() {
  if (emptyIndex>=5) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex-5));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex -= 5;
  }
}

function MoveDown() {
  if (emptyIndex<=20) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex+5));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex += 5;
  }
}

function MoveLeft() {
  if (emptyIndex%5 !== 0) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex-1));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex -= 1;
  }
}

function MoveRight() {
  if (emptyIndex%5 !== 4) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex+1));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex += 1;
  }
}

function youWin() {
  message = document.createElement('h1');
  message.innerHTML = "You Win!";
  message.classList.add('message');
  document.querySelector('.response').appendChild(message);
}

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 38:
      MoveUp();
      checkFinish();
      break;
    case 40:
      MoveDown();
      checkFinish();
      break;
    case 39:
      MoveRight();
      checkFinish();
      break;
    case 37:
      MoveLeft();
      checkFinish();
      break;
  }
})
