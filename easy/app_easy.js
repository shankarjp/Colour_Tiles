const puzzle = document.querySelector('.puzzle');
const solution = document.querySelector('.solution');
var squares = [];
var solutionSquares = [];
var colors = ["red", "blue", "green", "yellow", "orange", "white"];
var puzzleColors = [];
var solutionColors = [];
var response = [];
var emptyIndex = Math.floor(Math.random() * 25);
var moves = 0;

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

const bgm = document.querySelector(".bgm");
function playbgm(){
  bgm.loop = true;
  bgm.play();
}
function stopbgm(){
  bgm.pause();
}

function createPuzzle() {
  for(let i=0; i<25; i++) {
    square = document.createElement('div');
    square.classList.add("box"+i);
    square.classList.add("square");
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

var seconds = 0;
var minutes = 0;
var displaySeconds = 0;
var displayMinutes = 0;

function timeStart() {
  seconds += 1;
  if(seconds/60 === 1) {
    seconds = 0;
    minutes += 1;
  }
  if(seconds<10) {
    displaySeconds = "0" + seconds;
  } else {
    displaySeconds = seconds;
  }
  if(minutes<10) {
    displayMinutes = "0" + minutes;
  } else {
    displayMinutes = minutes;
  }
  document.querySelector('.score').lastElementChild.innerHTML = "Time : " + displayMinutes+":"+displaySeconds;
}
var timer = setInterval(timeStart, 1000);

function insertBlackbox() {
  blackbox = document.createElement('div');
  blackbox.classList.add('black-box');
  puzzle.appendChild(blackbox);
}
insertBlackbox();

function increaseMoves() {
  slideplay();
  moves += 1;
  document.querySelector('.score').firstElementChild.innerHTML = "Moves : "+ moves;
}

function MoveDown() {
  if (emptyIndex>=5) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex-5));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex -= 5;
    increaseMoves();
  }
}

function MoveUp() {
  if (emptyIndex<=20) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex+5));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex += 5;
    increaseMoves();
  }
}

function MoveRight() {
  if (emptyIndex%5 !== 0) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex-1));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex -= 1;
    increaseMoves();
  }
}

function MoveLeft() {
  if (emptyIndex%5 !== 4) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex+1));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex += 1;
    increaseMoves();
  }
}

function youWin() {
  endScreen = document.createElement('div');
  endScreen.classList.add('endScreen');
  puzzle.appendChild(endScreen)
  message = document.createElement('h1');
  message.innerHTML = "You Win!";
  message.classList.add('message');
  puzzle.appendChild(message);
  document.querySelector('.black-box').classList.add('endBlackbox');
  home = document.createElement('h1');
  home.classList.add('home');
  home.innerHTML = "Home";
  tryAgain = document.createElement('h1');
  tryAgain.classList.add('tryAgain');
  tryAgain.innerHTML = "Try Again";
  choicebox = document.createElement('div');
  choicebox.classList.add('choicebox');
  choicebox.appendChild(home);
  choicebox.appendChild(tryAgain);
  puzzle.appendChild(choicebox);
  clearInterval(timer);
  document.querySelector('.tryAgain').addEventListener("click", function() {
    window.location.reload(false);
  })
  document.querySelector('.home').addEventListener("click", function() {
    window.location.replace("#");
  })
}

function slideplay(){
  var slide = new Audio("resources/slide.mp3");
  if(slide.paused) {
    slide.play();
  } else {
    slide.currentTime = 0
  }
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
    case 66:
      playbgm();
      document.querySelector(".instruction").innerHTML = "Press S to stop background music 🔇";
      break;
    case 83:
      stopbgm();
      document.querySelector(".instruction").innerHTML = "Press B for better experience 🎧";
      break;
  }
})

document.querySelector(".home").addEventListener("click", function() {
  window.location.href = "../index.html";
})
