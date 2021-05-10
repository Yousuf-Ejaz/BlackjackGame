let blackjackGame = {
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A' ],
    'cardMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]}
    
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

let hitSound = new Audio('./blackjack_assets/sounds/swish.m4a')

document.querySelector('#hit-button').addEventListener('click',blackjackHit);
document.querySelector('#stand-button').addEventListener('click',blackjackStand);
document.querySelector('#deal-button').addEventListener('click',blackjackDeal);


function blackjackHit()
{
    let card =randomCard();
    showCard(card, YOU);
    updateScore(card,YOU);
    showScore(YOU);
    
}

function blackjackStand()
{
    let card =randomCard();
    showCard(card, DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
}

function randomCard()
{
    let randomIndex = Math.floor(Math.random() *13);
    let card = blackjackGame['cards'][randomIndex];
    return card;
}

function showCard(card, activePlayer)
{
    let createImage= document.createElement('img')
    createImage.src=`./blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(createImage);
    hitSound.play();
}

function updateScore(card, activePlayer)
{
    activePlayer['score'] += blackjackGame['cardMap'][card];
}

function showScore (activePlayer)
{
    document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
}



