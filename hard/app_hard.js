const puzzle = document.querySelector('.puzzle');
const solution = document.querySelector('.solution');
var squares = [];
var solutionSquares = [];
var colors = ["red", "blue", "green", "yellow", "orange", "white"];
var puzzleColors = [];
var solutionColors = [];
var response = [];
var emptyIndex = Math.floor(Math.random() * 36);
var moves = 0;

function createRecord() {
  if(JSON.parse(localStorage.getItem(name+"Hard")) !== null) {
    document.querySelector(".record").innerHTML = "Record : " + JSON.parse(localStorage.getItem(name+"Hard")).record;
  } else {
    document.querySelector(".record").innerHTML = "Record : none";
  }
}
document.querySelector(".record").innerHTML = "Record : none";


function setRecord() {
  console.log("I'm here!");
  if(JSON.parse(localStorage.getItem(name+"Hard")) !== null) {
      if(JSON.parse(localStorage.getItem(name+"Hard")).record > moves) {
        var data = {record: moves};
        localStorage.setItem(name+"Hard", JSON.stringify(data));
      }
    } else {
    var data = {record: moves}
    localStorage.setItem(name+"Hard", JSON.stringify(data));
  }
  document.querySelector(".record").innerHTML = "Record : " + JSON.parse(localStorage.getItem(name+"Hard")).record;
};

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
  for(let i=0; i<36; i++) {
    square = document.createElement('div');
    square.classList.add("box"+i);
    square.classList.add("square");
    puzzle.appendChild(square);
    squares.push(square);
  }
}
createPuzzle()

function createSolution() {
  for(let j=0; j<16; j++) {
    solutionSquare = document.createElement('div');
    solution.appendChild(solutionSquare);
    solutionSquares.push(solutionSquare);
  }
}
createSolution()

function generatePuzzle() {
  for(let k=0; k<36; k++) {
    if(k !== emptyIndex) {
      var newColor = colors[Math.floor(Math.random() * colors.length)]
      squares[k].style.backgroundColor = newColor;
      puzzleColors.push(newColor);
    }
  }
}
generatePuzzle();

function generateSolution() {
  for (let l=0; l<16; l++) {
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
  response[0] = document.querySelector('.box8').style.backgroundColor;
  response[1] = document.querySelector('.box9').style.backgroundColor;
  response[2] = document.querySelector('.box10').style.backgroundColor;
  response[3] = document.querySelector('.box11').style.backgroundColor;
  response[4] = document.querySelector('.box14').style.backgroundColor;
  response[5] = document.querySelector('.box15').style.backgroundColor;
  response[6] = document.querySelector('.box16').style.backgroundColor;
  response[7] = document.querySelector('.box17').style.backgroundColor;
  response[8] = document.querySelector('.box20').style.backgroundColor;
  response[8] = document.querySelector('.box21').style.backgroundColor;
  response[8] = document.querySelector('.box22').style.backgroundColor;
  response[8] = document.querySelector('.box23').style.backgroundColor;
  response[8] = document.querySelector('.box26').style.backgroundColor;
  response[8] = document.querySelector('.box27').style.backgroundColor;
  response[8] = document.querySelector('.box28').style.backgroundColor;
  response[8] = document.querySelector('.box29').style.backgroundColor;
  for(let m=0; m<16; m++) {
    if(response[m] !== solutionColors[m]) {
      break;
    } else if(m===15) {
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
  document.querySelector('.score-time').innerHTML = "Time : " + displayMinutes+":"+displaySeconds;
}

function insertBlackbox() {
  blackbox = document.createElement('div');
  blackbox.classList.add('black-box');
  puzzle.appendChild(blackbox);
}
insertBlackbox();

function increaseMoves() {
  slideplay();
  moves += 1;
  document.querySelector('.score-moves').innerHTML = "Moves : "+ moves;
}

function MoveDown() {
  if (emptyIndex>=6) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex-6));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex -= 6;
    increaseMoves();
  }
}

function MoveUp() {
  if (emptyIndex<=30) {
    current = document.querySelector(".box"+emptyIndex);
    target = document.querySelector(".box"+(emptyIndex+6));
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex += 6;
    increaseMoves();
  }
}

function MoveRight() {
  if (emptyIndex%6 !== 0) {
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
  if (emptyIndex%6 !== 5) {
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
  setRecord();
  document.querySelector('.tryAgain').addEventListener("click", function() {
    window.location.reload(false);
  })
  document.querySelector('.home').addEventListener("click", function() {
    window.location.replace("../index.html");
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

document.querySelector(".home").addEventListener("click", function() {
  window.location.href = "../index.html";
})

function enableMousemove() {
  for(let j=0; j<36; j++) {
    document.querySelector(".box"+j).addEventListener("click", function(e) {
      var index = j;
      if((emptyIndex - index) === 6) {
        MoveDown();
        checkFinish();
      } else if((emptyIndex - index) === -6) {
        MoveUp();
        checkFinish();
      } else if((emptyIndex - index) === 1) {
        MoveRight();
        checkFinish();
      } else if((emptyIndex - index) === -1) {
        MoveLeft();
        checkFinish();
      }
    })
  }
}

function createInput() {
  inputDiv = document.querySelector(".input-div");
  inputBox = document.createElement("input");
  inputBox.setAttribute("placeholder", "What's your Name?");
  inputBox.classList.add(".input-box");
  submitButton = document.createElement("button");
  submitButton.innerHTML = "Let's Go!";
  submitButton.classList.add(".submit-button");
  inputDiv.appendChild(inputBox);
  inputDiv.appendChild(submitButton);
}
createInput();

function deleteInput() {
  name = inputBox.value;
  createRecord();
  inputDiv.remove();
  timer = setInterval(timeStart, 1000);
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
  enableMousemove();
  var player = document.createElement("h1");
  player.innerHTML = "Player : " + name;
  document.querySelector(".player").appendChild(player);
}
submitButton.addEventListener("click", deleteInput);
