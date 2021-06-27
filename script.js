let blackjackGame = {
  you: { scorespan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scorespan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const hitSound = new Audio("blackjack_assets/sounds/swish.m4a");
const dealSound = new Audio("blackjack_assets/sounds/swish.m4a");
const winSound = new Audio("blackjack_assets/sounds/cash.mp3");
const lossSound = new Audio("blackjack_assets/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackhit);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

function blackjackhit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] + blackjackGame["cardsMap"][card] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
  if (card === "A") {
    let cardImage = document.createElement("img");
    cardImage.src = `blackjack_assets/images/A.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    for (let i = 0; i < yourImages.length; ++i) {
      yourImages[i].remove();
    }
    for (let i = 0; i < dealerImages.length; ++i) {
      dealerImages[i].remove();
    }

    resetScore();
  }
}

function resetScore() {
  document.querySelector(YOU["scorespan"]).textContent = 0;
  YOU["score"] = 0;
  document.querySelector(DEALER["scorespan"]).textContent = 0;
  DEALER["score"] = 0;
  document
    .querySelector(YOU["scorespan"])
    .setAttribute("style", "color: white;");
  document
    .querySelector(DEALER["scorespan"])
    .setAttribute("style", "color: white;");
  document.querySelector("#Blackjack-result").textContent = "Let's Play";
  document.querySelector("#Blackjack-result").style.color = "black";

  blackjackGame["turnsOver"] = false;
  blackjackGame["isStand"] = false;
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21)
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    else activePlayer["score"] += blackjackGame["cardsMap"][card][0];
  } else {
    activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] <= 21)
    document.querySelector(activePlayer["scorespan"]).textContent =
      activePlayer["score"];
  else {
    document.querySelector(activePlayer["scorespan"]).textContent = "BUST!";
    document
      .querySelector(activePlayer["scorespan"])
      .setAttribute("style", "color: red;");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }

  blackjackGame["turnsOver"] = true;
  let winnerPlayer = computeWinner();
  showResult(winnerPlayer);
}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
      blackjackGame["wins"]++;
    } else if (YOU["score"] < DEALER["score"] && DEALER["score"] <= 21) {
      winner = DEALER;
      blackjackGame["losses"]++;
    } else {
      winner = "Draw";
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
    blackjackGame["losses"]++;
  } else {
    winner = "Draw";
    blackjackGame["draws"]++;
  }

  return winner;
}

function showResult(winner) {
  if (blackjackGame["turnsOver"] === true) {
    let message, messageColor;

    if (winner === YOU) {
      message = "You Won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      message = "You Lost!";
      messageColor = "red";
      lossSound.play();
    } else {
      message = "You Drew!";
      messageColor = "black";
    }

    document.querySelector("#Blackjack-result").textContent = message;
    document.querySelector("#Blackjack-result").style.color = messageColor;

    if (winner === YOU)
      document.querySelector("#wins").textContent = blackjackGame["wins"];
    else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
    }
  }
}
