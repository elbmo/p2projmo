var cards = document.querySelectorAll(".card");
var movesEl = document.querySelector(".moves");
var bestEl = document.querySelector(".best");
var resetBtn = document.querySelector(".reset");

var cardOne = null;
var cardTwo = null;
var disableDeck = false;
var moves = 0;
var matchedPairs = 0;

var bestScore = localStorage.getItem("memoryBest");
if (bestScore) {
  bestEl.textContent = bestScore;
} else {
  bestEl.textContent = "-";
}

function flipCard(event) {
  var clickedCard = event.currentTarget;

  if (disableDeck === true || clickedCard === cardOne) {
    return;
  }

  clickedCard.classList.add("flip");

  if (cardOne === null) {
    cardOne = clickedCard;
    return;
  }

  cardTwo = clickedCard;
  disableDeck = true;

  moves = moves + 1;
  movesEl.textContent = moves;

  var img1 = cardOne.querySelector("img").src;
  var img2 = cardTwo.querySelector("img").src;

  checkMatch(img1, img2);
}

function checkMatch(img1, img2) {
  if (img1 === img2) {
    matchedPairs = matchedPairs + 1;

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);

    resetTurn();

    if (matchedPairs === 8) {
      finishGame();
    }
  } else {
    setTimeout(function () {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
}

function finishGame() {
  if (bestScore === null || moves < bestScore) {
    localStorage.setItem("memoryBest", moves);
    bestEl.textContent = moves;
    bestScore = moves;
  }
}

function resetGame() {
  var order = [];
  var i;

  moves = 0;
  matchedPairs = 0;
  movesEl.textContent = "0";
  disableDeck = false;
  cardOne = null;
  cardTwo = null;

  for (i = 0; i < cards.length; i++) {
    order.push(i);
  }

  order.sort(function () {
    return Math.random() - 0.5;
  });

  for (i = 0; i < cards.length; i++) {
    cards[i].classList.remove("flip");
    cards[i].style.order = order[i];
    cards[i].addEventListener("click", flipCard);
  }
}

resetBtn.addEventListener("click", resetGame);
resetGame();
