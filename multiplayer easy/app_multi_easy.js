const puzzle = document.querySelectorAll('.puzzle');
const solution = document.querySelectorAll('.solution');
var squares = [[],[]];
var solutionSquares = [[],[]];
var colors = ["red", "blue", "green", "yellow", "orange", "white"];
var puzzleColors = [];
var solutionColors = [];
var response = [[],[]];
var emptyIndex1 = Math.floor(Math.random() * 25);
var emptyIndex2 = emptyIndex1;
var moves1 = 0;
var moves2 = 0;
var inputCount = 0;
var isFinish1 = 0;
var isFinish2 = 0;
var lastFinish = 0;
var firstCount = 0;
var secondCount = 0;


/*Creating the puzzle*/
function createPuzzle() {
  for(let i=0; i<25; i++) {
    for(let j=0; j<2; j++) {
      square = document.createElement('div');
      square.classList.add("box"+i);
      square.classList.add("square");
      puzzle[j].appendChild(square);
      squares[j].push(square);
    }
  }
}
createPuzzle();

function generatePuzzle() {
  for(let k=0; k<25; k++) {
    if(k !== emptyIndex1) {
      var newColor = colors[Math.floor(Math.random() * colors.length)]
      squares[0][k].style.backgroundColor = newColor;
      squares[1][k].style.backgroundColor = newColor;
      puzzleColors.push(newColor);
    }
  }
}
generatePuzzle();

function insertBlackbox() {
  blackbox1 = document.createElement('div');
  blackbox1.classList.add('black-box');
  puzzle[0].appendChild(blackbox1);
  blackbox2 = document.createElement('div');
  blackbox2.classList.add('black-box');
  puzzle[1].appendChild(blackbox2);
}
insertBlackbox();

/*Create the solution*/
function createSolution() {
  for(let j=0; j<9; j++) {
    for(let k=0; k<2; k++) {
      solutionSquare = document.createElement('div');
      solution[k].appendChild(solutionSquare);
      solutionSquares[k].push(solutionSquare);
    }
  }
}
createSolution()

function generateSolution() {
  for (let l=0; l<9; l++) {
    newIndex = Math.floor(Math.random() * puzzleColors.length);
    solutionSquares[0][l].style.backgroundColor = puzzleColors[newIndex];
    solutionSquares[1][l].style.backgroundColor = puzzleColors[newIndex];
    solutionColors.push(puzzleColors[newIndex]);
    puzzleColors.splice(newIndex, 1);
  }
}
generateSolution();
console.log(puzzleColors);
console.log(solutionColors);

/*Create Input Box*/
function createInput() {
  inputDiv = document.querySelectorAll(".input-div");
  for(let m=0; m<2; m++) {
    var inputBox = document.createElement("input");
    inputBox.setAttribute("placeholder", "What's your Name?");
    inputBox.classList.add(".input-box"+(m+1));
    var submitButton = document.createElement("button");
    submitButton.innerHTML = "Let's Go!";
    submitButton.classList.add(".submit-button"+m);
    inputDiv[m].appendChild(inputBox);
    inputDiv[m].appendChild(submitButton);
  }
}
createInput();

/*Enable functionality after entering Name*/
for(let n=0; n<2; n++) {
  document.getElementsByClassName(".submit-button"+n)[0].addEventListener("click", function(e) {
    inputCount++;
    enableFunction();
    createRecord(n);
    var name = document.getElementsByClassName(".input-box"+(n+1))[0].value;
    inputDiv[n].remove();
    var player = document.createElement("h1");
    player.classList.add("playerHeading"+(n+1));
    player.innerHTML = "Player " + (n+1) + " : " + name;
    document.querySelector(".playerName"+(n+1)).appendChild(player);
  })
}

function enableFunction() {
  if(inputCount === 2) {
    console.log("I am here!");
    timer = setInterval(timeStart, 1000);
    keyFunction2 = function(event) {
      switch (event.keyCode) {
        case 38:
          MoveUp2();
          checkFinish();
          break;
        case 40:
          MoveDown2();
          checkFinish();
          break;
        case 39:
          MoveRight2();
          checkFinish();
          break;
        case 37:
          MoveLeft2();
          checkFinish();
          break;
      }
    };
    keyFunction1 = function(event) {
      switch (event.keyCode) {
        case 65:
          MoveLeft1();
          checkFinish();
          break;
        case 68:
          MoveRight1();
          checkFinish();
          break;
        case 87:
          MoveUp1();
          checkFinish();
          break;
        case 83:
          MoveDown1();
          checkFinish();
          break;
      }
    };
    musicFunction = function(event) {
      switch (event.keyCode) {
        case 66:
          playbgm();
          document.querySelector(".instruction").innerHTML = "Press M to stop background music 🔇";
          break;
        case 77:
          stopbgm();
          document.querySelector(".instruction").innerHTML = "Press B for better experience 🎧";
          break;
      }
    };
    document.addEventListener('keyup', keyFunction1);
    document.addEventListener('keyup', keyFunction2);
    document.addEventListener('keyup', musicFunction);
    enableMousemove();
  }
}


/*Enabling Mouse Movement*/
function enableMousemove() {
  for(let j=0; j<25; j++) {
    document.querySelectorAll(".box"+j)[0].addEventListener("click", function enablePuzzle1(e) {
      var index1 = j;
      if((emptyIndex1 - index1) === 5) {
        MoveDown1();
        checkFinish();
      } else if((emptyIndex1 - index1) === -5) {
        MoveUp1();
        checkFinish();
      } else if((emptyIndex1 - index1) === 1) {
        MoveRight1();
        checkFinish();
      } else if((emptyIndex1 - index1) === -1) {
        MoveLeft1();
        checkFinish();
      }
    });
      document.querySelectorAll(".box"+j)[1].addEventListener("click", function enablePuzzle2(e) {
        var index2 = j;
        if((emptyIndex2 - index2) === 5) {
          MoveDown2();
          checkFinish();
        } else if((emptyIndex2 - index2) === -5) {
          MoveUp2();
          checkFinish();
        } else if((emptyIndex2 - index2) === 1) {
          MoveRight2();
          checkFinish();
        } else if((emptyIndex2 - index2) === -1) {
          MoveLeft2();
          checkFinish();
        }
  });
}}

/*Block Movement Functions*/
function MoveDown1() {
  if (emptyIndex1>=5) {
    current = document.querySelectorAll(".box"+emptyIndex1)[0];
    target = document.querySelectorAll(".box"+(emptyIndex1-5))[0];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex1 -= 5;
    increaseMoves1();
  }
}

function MoveDown2() {
  if (emptyIndex2>=5) {
    current = document.querySelectorAll(".box"+emptyIndex2)[1];
    target = document.querySelectorAll(".box"+(emptyIndex2-5))[1];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex2 -= 5;
    increaseMoves2();
  }
}

function MoveUp1() {
  if (emptyIndex1<=20) {
    current = document.querySelectorAll(".box"+emptyIndex1)[0];
    target = document.querySelectorAll(".box"+(emptyIndex1+5))[0];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex1 += 5;
    increaseMoves1();
  }
}

function MoveUp2() {
  if (emptyIndex2<=20) {
    current = document.querySelectorAll(".box"+emptyIndex2)[1];
    target = document.querySelectorAll(".box"+(emptyIndex2+5))[1];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex2 += 5;
    increaseMoves2();
  }
}

function MoveRight1() {
  if (emptyIndex1 %5 !== 0) {
    current = document.querySelectorAll(".box"+emptyIndex1)[0];
    target = document.querySelectorAll(".box"+(emptyIndex1-1))[0];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex1 -= 1;
    increaseMoves1();
  }
}

function MoveRight2() {
  if (emptyIndex2 %5 !== 0) {
    current = document.querySelectorAll(".box"+emptyIndex2)[1];
    target = document.querySelectorAll(".box"+(emptyIndex2-1))[1];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex2 -= 1;
    increaseMoves2();
  }
}

function MoveLeft1() {
  if (emptyIndex1 %5 !== 4) {
    current = document.querySelectorAll(".box"+emptyIndex1)[0];
    target = document.querySelectorAll(".box"+(emptyIndex1+1))[0];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex1 += 1;
    increaseMoves1();
  }
}

function MoveLeft2() {
  if (emptyIndex2 %5 !== 4) {
    current = document.querySelectorAll(".box"+emptyIndex2)[1];
    target = document.querySelectorAll(".box"+(emptyIndex2+1))[1];
    var temp = current.style.backgroundColor;
    current.style.backgroundColor = target.style.backgroundColor;
    target.style.backgroundColor = temp;
    emptyIndex2 += 1;
    increaseMoves2();
  }
}

function increaseMoves1() {
  slideplay();
  moves1 += 1;
  document.querySelectorAll('.score-moves')[0].innerHTML = "Moves : "+ moves1;
}

function increaseMoves2() {
  slideplay();
  moves2 += 1;
  document.querySelectorAll('.score-moves')[1].innerHTML = "Moves : "+ moves2;
}

/*Maintaining Record*/
function createRecord(p) {
  if(JSON.parse(localStorage.getItem(document.getElementsByClassName(".input-box"+(p+1))[0].value)) !== null) {
    document.querySelectorAll(".record")[p].innerHTML = "Record : " + JSON.parse(localStorage.getItem(document.getElementsByClassName(".input-box"+(p+1))[0].value)).record;
  } else {
    document.querySelectorAll(".record")[p].innerHTML = "Record : none";
  }
}
document.querySelectorAll(".record")[0].innerHTML = "Record : none";
document.querySelectorAll(".record")[1].innerHTML = "Record : none";

function setRecord() {
  console.log("I'm here!");
  var name1 = (document.querySelectorAll(".playerHeading1")[0].innerHTML).split(": ")[1];
  if(JSON.parse(localStorage.getItem(name1)) !== null) {
      if(JSON.parse(localStorage.getItem(name1)).record > moves1) {
        var data1 = {record: moves1};
        localStorage.setItem(name1, JSON.stringify(data1));
      }
    } else {
    var data1 = {record: moves1}
    localStorage.setItem(name1, JSON.stringify(data1));
  }
  document.querySelectorAll(".record")[0].innerHTML = "Record : " + JSON.parse(localStorage.getItem(name1)).record;

  var name2 = (document.querySelectorAll(".playerHeading2")[0].innerHTML).split(": ")[1];
  if(JSON.parse(localStorage.getItem(name2)) !== null) {
      if(JSON.parse(localStorage.getItem(name2)).record > moves2) {
        var data2 = {record: moves2};
        localStorage.setItem(name2, JSON.stringify(data2));
      }
    } else {
    var data2 = {record: moves2}
    localStorage.setItem(name2, JSON.stringify(data2));
  }
  document.querySelectorAll(".record")[1].innerHTML = "Record : " + JSON.parse(localStorage.getItem(name2)).record;
};

/*Checking for game finish*/
function checkFinish() {
  for(let r=0; r<2; r++) {
    response[r][0] = document.querySelectorAll('.box6')[r].style.backgroundColor;
    response[r][1] = document.querySelectorAll('.box7')[r].style.backgroundColor;
    response[r][2] = document.querySelectorAll('.box8')[r].style.backgroundColor;
    response[r][3] = document.querySelectorAll('.box11')[r].style.backgroundColor;
    response[r][4] = document.querySelectorAll('.box12')[r].style.backgroundColor;
    response[r][5] = document.querySelectorAll('.box13')[r].style.backgroundColor;
    response[r][6] = document.querySelectorAll('.box16')[r].style.backgroundColor;
    response[r][7] = document.querySelectorAll('.box17')[r].style.backgroundColor;
    response[r][8] = document.querySelectorAll('.box18')[r].style.backgroundColor;
    for(let m=0; m<9; m++) {
      if(response[r][m] !== solutionColors[m]) {
        break;
      } else if(m===8) {
        if(r===0) {
          if(isFinish1<1) {
            isFinish1++;
            var endScreen = document.createElement('div');
            endScreen.classList.add('endScreen');
            puzzle[r].appendChild(endScreen);
            document.removeEventListener('keyup',  keyFunction1);
            document.querySelectorAll('.black-box')[0].classList.add('endBlackbox');
          }
          firstCount++;
        } else if(r===1) {
          if(isFinish2<1) {
            isFinish2++;
            var endScreen = document.createElement('div');
            endScreen.classList.add('endScreen');
            puzzle[r].appendChild(endScreen);
            document.removeEventListener('keyup',  keyFunction2);
            document.querySelectorAll('.black-box')[1].classList.add('endBlackbox');
          }
          secondCount++;
        }
        if((isFinish1>=1)&&(isFinish2>=1)) {
          if(firstCount > secondCount) {
            lastFinish = 1;
          } else if(secondCount > firstCount) {
            lastFinish = 0;
          }
          youWin();
        }
        }
      }
    }
  }

function youWin() {
  if(moves1 < moves2) {
    winnum = 1;
  } else if(moves2 < moves1) {
    winnum = 2;
  } else {
    winnum = -1;
  }
  for(let t=0; t<2; t++) {
    if(t === (winnum-1)) {
      var message = document.createElement('h1');
      message.innerHTML = "You Win!";
      message.classList.add('message');
      puzzle[t].appendChild(message);
    } else if(winnum === -1) {
      if(t === lastFinish) {
        var message = document.createElement('h1');
        message.innerHTML = "You Lose!";
        message.classList.add('message');
        puzzle[t].appendChild(message);
      } else {
        var message = document.createElement('h1');
        message.innerHTML = "You Win!";
        message.classList.add('message');
        puzzle[t].appendChild(message);
      }
    } else {
      var message = document.createElement('h1');
      message.innerHTML = "You Lose!";
      message.classList.add('message');
      puzzle[t].appendChild(message);
    }
    setRecord();
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
    puzzle[t].appendChild(choicebox);
  }
  clearInterval(timer);
  document.removeEventListener('keyup',  musicFunction);
  document.querySelectorAll('.tryAgain')[0].addEventListener("click", function() {
    window.location.reload(false);
  })
  document.querySelectorAll('.tryAgain')[1].addEventListener("click", function() {
    window.location.reload(false);
  })
  document.querySelectorAll('.home')[0].addEventListener("click", function() {
    window.location.replace("../index.html");
  })
  document.querySelectorAll('.home')[1].addEventListener("click", function() {
    window.location.replace("../index.html");
  })
}

/*Timer*/
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

/*Sound Effects*/
const bgm = document.querySelector(".bgm");
function playbgm(){
  bgm.loop = true;
  bgm.play();
}
function stopbgm(){
  bgm.pause();
}

function slideplay(){
  var slide = new Audio("resources/slide.mp3");
  if(slide.paused) {
    slide.play();
  } else {
    slide.currentTime = 0
  }
}

/*Home button*/
document.querySelector(".home").addEventListener("click", function() {
  window.location.href = "../index.html";
})

/*Avoid arrows to scroll the page*/
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
