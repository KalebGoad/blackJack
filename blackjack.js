let player = {
    name: "Chips",
    chips:  200
}
const deck = {
    1 : "./assets/ace_of_spades.png",
    2 : "./assets/2_of_spades.png",
    3 : "./assets/3_of_spades.png",
    4 : "./assets/4_of_spades.png",
    5 : "./assets/5_of_spades.png",
    6 : "./assets/6_of_spades.png",
    7 : "./assets/7_of_spades.png",
    8 : "./assets/8_of_spades.png",
    9 : "./assets/9_of_spades.png",
    10 : "./assets/10_of_spades.png",
    11 : "./assets/jack_of_spades.png",
    12 : "./assets/queen_of_spades.png",
    13 : "./assets/king_of_spades.png",
    14 : "./assets/ace_of_hearts.png",
    15 : "./assets/2_of_hearts.png",
    16 : "./assets/3_of_hearts.png",
    17 : "./assets/4_of_hearts.png",
    18 : "./assets/5_of_hearts.png",
    19 : "./assets/6_of_hearts.png",
    20 : "./assets/7_of_hearts.png",
    21 : "./assets/8_of_hearts.png",
    22 : "./assets/9_of_hearts.png",
    23 : "./assets/10_of_hearts.png",
    24 : "./assets/jack_of_hearts.png",
    25 : "./assets/queen_of_hearts.png",
    26 : "./assets/king_of_hearts.png",
    27 : "./assets/ace_of_clubs.png",
    28 : "./assets/2_of_clubs.png",
    29 : "./assets/3_of_clubs.png",
    30 : "./assets/4_of_clubs.png",
    31 : "./assets/5_of_clubs.png",
    32 : "./assets/6_of_clubs.png",
    33 : "./assets/7_of_clubs.png",
    34 : "./assets/8_of_clubs.png",
    35 : "./assets/9_of_clubs.png",
    36 : "./assets/10_of_clubs.png",
    37 : "./assets/jack_of_clubs.png",
    38 : "./assets/queen_of_clubs.png",
    39 : "./assets/king_of_clubs.png",
    40 : "./assets/ace_of_diamonds.png",
    41 : "./assets/2_of_diamonds.png",
    42 : "./assets/3_of_diamonds.png",
    43 : "./assets/4_of_diamonds.png",
    44 : "./assets/5_of_diamonds.png",
    45 : "./assets/6_of_diamonds.png",
    46 : "./assets/7_of_diamonds.png",
    47 : "./assets/8_of_diamonds.png",
    48 : "./assets/9_of_diamonds.png",
    49 : "./assets/10_of_diamonds.png",
    50 : "./assets/jack_of_diamonds.png",
    51 : "./assets/queen_of_diamonds.png",
    52 : "./assets/king_of_diamonds.png"
}

// import { deck } from "./cards.js";

let cards = []
let dealerCards = []
let sum = 0
let sumDealer = 0
let isAlive = true
let message = ""
let messageDealer = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let newEl = document.getElementById("new-el")
let playerEl = document.getElementById("player-el")
let startEl = document.getElementById("start-el")
let standEl = document.getElementById("stand-el")
let quantity = document.getElementById("quantity")
let chipsEl = document.getElementById("chips-el")

let dealerEl = document.getElementById("dealer-el")
let dealerMessageEl = document.getElementById("message-dealer")
let cardsDealerEl = document.getElementById("cards-dealer")
let sumDealerEl = document.getElementById("sum-dealer")


startEl.hidden = true;
newEl.hidden = true;
standEl.hidden = true;

playerEl.textContent = player.name + ": $" + player.chips



function getRandomCard() {
    // if 1   -> return 11
    let randomNumber = Math.floor(Math.random()*52 ) + 1 // goes through deck 
    
    if (randomNumber%13 > 10 || randomNumber%13 === 0) {
        sum+= 10
    } else if (randomNumber%13 === 1) {
        if(sum >= 11) {
         sum+= 1
        } else {
            sum+= 11
        }
    } 
return randomNumber
}


function chipsWager() {

    startEl.hidden = false;
    newEl.hidden = false;
    standEl.hidden = false;
    
}

function startGame() {
    
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    // sum = firstCard%13 + secondCard%13
    let firstDealerCard = getRandomCard() 
    dealerCards = [firstDealerCard]
    sumDealer = firstDealerCard
    renderGame()

    startEl.textContent = "START GAME"

}

function renderGame() {
    document.querySelectorAll("#deck img").forEach((element) => element.remove())
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i]%13 + " "
    }
    for (let i = 0; i < cards.length; i++) {
        let img = document.createElement('img');
        img.src = deck[cards[i]];
        document.querySelector("#deck").appendChild(img);

    }

    cardsDealerEl.textContent = "Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        cardsDealerEl.textContent += dealerCards[i] + " "
    }


    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card? 😁"

    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳 Select a new wager amount to begin next round."
        isAlive= false;
        startEl.hidden = true;
        newEl.hidden = true;
        standEl.hidden = true;
        player.chips = player.chips + Number(quantity.value)
        console.log(player.chips)
        playerEl.textContent = player.name + ": $" + player.chips
        startEl.textContent = "RESTART GAME"
    } else {
        message = "Busted! You lose this round! 😭 Select a new wager amount to begin next round."
        isAlive = false
        startEl.hidden = true;
        newEl.hidden = true;
        standEl.hidden = true;
        player.chips = player.chips - Number(quantity.value)
        console.log(player.chips)
        playerEl.textContent = player.name + ": $" + player.chips
        startEl.textContent = "RESTART GAME"
        
    }



    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true) {
        let card = getRandomCard()
        console.log(card)
        // sum += card%13
        console.log(sum)
        cards.push(card)
        console.log(cards)
        renderGame()
    }
}




const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function stand() {
        while (sumDealer < 17) {
            let card = getRandomCard()
            sumDealer += card
            dealerCards.push(card)
            cardsDealerEl.textContent = cardsDealerEl.textContent + " " + card
            sumDealerEl.textContent = "Sum: " + sumDealer
            await sleep(1000)
            }
        if (sumDealer > 21) {
            messageDealer = "Dealer BUSTS! Nice win!"
        }
        else if (sumDealer > sum && sumDealer <=21) {
            messageDealer = "I won this round! Please place your wager to play the next round." 
        }

        else if (sumDealer < sum) {
            messageDealer = "Congrats! You won this round!"
        }
        
        else if (sumDealer === sum) {
            messageDealer = "We TIED, however, I still WIN!"
        }

        dealerMessageEl.textContent = messageDealer
    }
    


