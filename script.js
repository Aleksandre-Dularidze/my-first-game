"use strict";

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let gameActive = true; // Track game state

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// Select elements
const difficultyOverlay = document.querySelector(".difficulty-overlay");
const difficultyButtons = document.querySelectorAll(".difficulty-options .btn");
const scoreElement = document.querySelector(".score");

let maxScore = 20; // Default max score

// Handle difficulty selection
difficultyButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const difficulty = this.classList.contains("easy")
      ? "easy"
      : this.classList.contains("medium")
      ? "medium"
      : "hard";

    if (difficulty === "easy") {
      maxScore = 20;
    } else if (difficulty === "medium") {
      maxScore = 10;
    } else if (difficulty === "hard") {
      maxScore = 3;
    }

    score = maxScore;
    scoreElement.textContent = score;

    // Hide the difficulty overlay
    difficultyOverlay.style.display = "none";
  });
});

document.querySelector(".check").addEventListener("click", function () {
  if (!gameActive) return; // Ignore clicks if game is over

  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  // When there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔️ No Number!';
    displayMessage("⛔️ No Number!");

    // When player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#498b35ff";
    document.querySelector(".number").style.width = "30rem";
    gameActive = false; // Stop further guesses
    document.querySelector(".guess").disabled = true; // Disable input

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
      displayMessage(guess > secretNumber ? "📈 Too High!" : "📉 Too Low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector('.message').textContent = '💥 You Lost The Game!';
      displayMessage("💥 You Lost The Game!");
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "#c54545ff";
      gameActive = false;
      document.querySelector(".guess").disabled = true;
    }
  }
  // When guess is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You Lost The Game!';
  //     document.querySelector('.score').textContent = 0;
  //     document.querySelector('body').style.backgroundColor = '#c54545ff';
  //     gameActive = false;
  //     document.querySelector('.guess').disabled = true;
  //   }
  //   // When guess is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You Lost The Game!';
  //     document.querySelector('.score').textContent = 0;
  //     document.querySelector('body').style.backgroundColor = '#c54545ff';
  //     gameActive = false; // Stop further guesses
  //     document.querySelector('.guess').disabled = true; // Disable input
  //   }
  // }

  // Refocus the input field after button click
  document.querySelector(".guess").focus();
});

document.querySelector(".again").addEventListener("click", function () {
  score = maxScore; // Use the current maxScore based on difficulty
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  gameActive = true; // Reactivate game
  // window.location.reload();

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;

  document.querySelector(".number").textContent = "?";

  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";

  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").disabled = false; // Enable input
});

document.querySelector(".guess").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.querySelector(".check").click();
  }
});
