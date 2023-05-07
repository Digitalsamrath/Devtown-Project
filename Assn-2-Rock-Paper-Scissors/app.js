let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const result_div = document.getElementById("result-label");
const userChoice_div = document.getElementById("user-choice");
const computerChoice_div = document.getElementById("computer-choice");
const resetButton = document.getElementById("reset");

function getComputerChoice() {
  const choices = ["stone", "paper", "scissor"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function win(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerChoice_div.classList.add("gray-glow");
  setTimeout(() => computerChoice_div.classList.remove("gray-glow"), 500);
  result_div.innerHTML = `${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}. You win!`;
}

function lose(userChoice, computerChoice) {
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  computerChoice_div.classList.add("red-glow");
  setTimeout(() => computerChoice_div.classList.remove("red-glow"), 500);
  result_div.innerHTML = `${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)}. You lose!`;
}

function draw(userChoice, computerChoice) {
  userChoice_div.classList.add("gray-glow");
  computerChoice_div.classList.add("gray-glow");
  setTimeout(() => {
    userChoice_div.classList.remove("gray-glow");
    computerChoice_div.classList.remove("gray-glow");
  }, 500);
  result_div.innerHTML = "It's a draw!";
}

function play(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + "-" + computerChoice) {
    case "stone-scissor":
    case "paper-stone":
    case "scissor-paper":
      win(userChoice, computerChoice);
      break;
    case "stone-paper":
    case "paper-scissor":
    case "scissor-stone":
      lose(userChoice, computerChoice);
      break;
    case "stone-stone":
    case "paper-paper":
    case "scissor-scissor":
      draw(userChoice, computerChoice);
      break;
  }
  if (userScore === 5 || computerScore === 5) {
    endGame();
  }
}

function endGame() {
  userChoice_div.style.display = "none";
  computerChoice_div.style.display = "none";
  resetButton.style.display = "block";
  if (userScore === 5) {
    result_div.innerHTML = "Congratulations! You won the game!";
  } else {
    result_div.innerHTML = "Sorry! You lost the game!";
  }
}

function reset() {
  userScore = 0;
  computerScore = 0;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_div.innerHTML = "";
  userChoice_div.style.display = "block";
  computerChoice_div.style.display = "block";
  resetButton.style.display = "none";
}

