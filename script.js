let blackjackGame = {
    'you':{'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A' ],
    
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

document.querySelector('#hit-button').addEventListener('click',blackjackHit)

function blackjackHit()
{

}



