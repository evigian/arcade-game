const info = document.getElementById("help");
const modal = document.getElementById("myModal");
const lastModal = document.getElementById("lastModal");
const closeModal = document.querySelector(".close");
let closeMod = document.querySelector(".closeMod");

const newGameButton = document.querySelector(".newGame");

const gameScore = document.querySelector(".score");
let score = 0;

let timer = document.querySelector(".timer");
let second = 0;
let minute = 0;

let interval;

const gameLives = document.querySelectorAll(".fa-heart");
let lives = 3;

let playerMove = true;

info.onclick = function() {
  modal.style.display = "block";
};

// code from w3schools
closeModal.onclick = function() {
  modal.style.display = "none";
};

// code from w3schools
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function startTimer() {
  if (interval) {
    return;
  }
  interval = setInterval(function() {
    timer.innerHTML = `${minute} mins : ${second} secs`;
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = Math.floor(Math.random() * 150 + 350);
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > 808) {
    this.x = -80;
  }

  // check for collisions
  if (
    this.x < player.x + 50 &&
    this.x + 50 > player.x &&
    this.y < player.y + 50 &&
    this.y + 50 > player.y
  ) {
    setTimeout(function() {
      player.x = 400;
      player.y = 480;
    }, 10);

    livesLeft();
  }
};

function livesLeft() {
  if (lives >= 1) {
    gameLives[lives - 1].style.visibility = "collapse";
    lives--;
  }
  if (lives == 0) {
    showModal();
  }

  function showModal() {
    let finalTime = timer.innerHTML;
    lastModal.style.display = "block";
    document.querySelector(
      ".final-score"
    ).innerHTML = `Your score is ${score} points.`;
    document.querySelector(
      ".final-time"
    ).innerHTML = `You made it in ${finalTime}.`;
    closeMessage();
    clearInterval(interval);
    playerMove = false;
  }
}

function closeMessage() {
  closeMod.addEventListener("click", function(e) {
    lastModal.style.display = "none";
    clearInterval(interval);
  });
}
window.onclick = function(event) {
  if (event.target == lastModal) {
    lastModal.style.display = "none";
    clearInterval(interval);
  }
};

function playAgain() {
  lastModal.style.display = "none";
  newGame();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
  this.x = 400;
  this.y = 480;

  this.sprite = "images/char-pink-girl.png";
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keypress) {
  if (keypress == "left" && this.x > 0) {
    this.x -= 101;
  }
  if (keypress == "right" && this.x < 700) {
    this.x += 101;
  }
  if (keypress == "up" && this.y > 0) {
    this.y -= 83;
  }
  if (keypress == "down" && this.y < 500) {
    this.y += 83;
  }
  if (this.y < 70) {
    setTimeout(function() {
      player.x = 400;
      player.y = 480;
    }, 10);

    score += 50;
    gameScore.innerHTML = score;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

const enemy = new Enemy(0, 145);
const enemy1 = new Enemy(-80, 205);
const enemy2 = new Enemy(-280, 270);
const enemy3 = new Enemy(-330, 340);
const enemy4 = new Enemy(-480, 400);

const allEnemies = [enemy, enemy1, enemy2, enemy3, enemy4];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  if (playerMove) {
    player.handleInput(allowedKeys[e.keyCode]);
  }
  startTimer();
});

function newGame() {
  clearInterval(interval);
  interval = null;
  score = 0;
  gameScore.innerHTML = 0;
  second = 0;
  minute = 0;
  timer.innerHTML = `${minute} mins: ${second} secs`;
  lives = 3;
  playerMove = true;
  resetLives();
}

function resetLives() {
  for (i = 0; i < 3; i++) {
    gameLives[i].style.visibility = "visible";
  }
}

newGameButton.addEventListener("click", newGame);
newGame();
